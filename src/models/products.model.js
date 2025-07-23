import { db } from '../config/firebase.config.js';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    endAt,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    startAt,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'products';
const productsCollection = collection(db, COLLECTION_NAME);

export const getAllProductsDB = async queryParams => {
    const { limitDoc = 10, startDocID, category, available, minPrice, maxPrice } = queryParams;
    try {
        const filters = [];
        if (category) filters.push(where('category', '==', category));
        if (available !== null) filters.push(where('available', '==', available));
        if (minPrice !== null) filters.push(where('minPrice', '>=', minPrice));
        if (maxPrice !== null) filters.push(where('maxPrice', '<=', maxPrice));

        let lastDoc = null;
        if (startDocID) {
            const lastDocRef = doc(db, COLLECTION_NAME, startDocID);
            lastDoc = await getDoc(lastDocRef);
            if (!lastDoc.exists()) throw new Error('Paginacion Invalida');
        }

        const queryDocs = query(
            productsCollection,
            orderBy('price'),
            ...filters,
            ...(lastDoc ? [startAfter(lastDoc)] : []),
            limit(limitDoc)
        );

        const snapshot = await getDocs(queryDocs);
        let products = snapshot.docs.map(p => {
            const data = p.data();
            return {
                id: p.id,
                ...data,
                releaseDate: data.releaseDate?.seconds
                    ? new Date(data.releaseDate.seconds * 1000).toISOString()
                    : null,
            };
        });
        return {
            products,
            lastProducts:
                snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null,
        };
    } catch (error) {
        console.error('Error al capturar los productos: ', error);
        throw new Error('Error al traer el producto de la Base de Datos');
    }
};

export const getProductsByIdDB = async id => {
    try {
        const docID = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docID);

        if (!snapshot.exists()) {
            throw new Error(`Productos de ID: ${id} no existe`);
        }
        const data = snapshot.data();
        return {
            product: {
                id: snapshot.id,
                ...data,
                releaseDate: data.releaseDate?.seconds
                    ? new Date(data.releaseDate.seconds * 1000).toISOString()
                    : null,
                updatedAt: data.updatedAt?.seconds
                    ? new Date(data.updatedAt.seconds * 1000).toISOString()
                    : null,
            },
        };
    } catch (error) {
        console.error('Error al capturar producto por id: ', error);
        throw new Error('Error al traer el producto de la Base de Datos');
    }
};

export const searchProductsByNameDB = async name => {
    try {
        const lowerName = name.toLowerCase();
        const queryName = query(
            productsCollection,
            orderBy('lowerName'),
            startAt(lowerName),
            endAt(lowerName + '\uf8ff')
        );
        const snapshot = await getDocs(queryName);
        const nameSearch = snapshot.docs.map(p => ({
            id: p.id,
            ...p.data(),
        }));
        return nameSearch;
    } catch (error) {
        console.error('Error al buscar producto por el nombre: ', error);
        throw new Error('Error al buscar producto por el nombre de la Base de Datos');
    }
};

export const createProductsDB = async productData => {
    try {
        if (!productData.name || !productData.price) {
            throw new Error('Los campos de nombre y precio son obligatorios');
        }

        const newProduct = {
            ...productData,
            lowerName: productData.name.toLowerCase(),
            releaseDate: Timestamp.now(),
        };

        const cleanData = Object.fromEntries(
            Object.entries(newProduct).filter(([_, v]) => v !== undefined)
        );

        const addProducts = await addDoc(productsCollection, cleanData);
        return { id: addProducts.id, ...cleanData };
    } catch (error) {
        console.error('Error al crear el producto: ', error);
        throw new Error('Error al crear el producto en la DB');
    }
};

export const updateProductDB = async (id, productData) => {
    try {
        const productRef = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
            throw new Error(`El producto de ID: ${id} no existe`);
        }

        const updateProduct = {
            ...productData,
            lowerName: productData.name.toLowerCase(),
            updatedAt: Timestamp.now(),
        };
        await updateDoc(productRef, updateProduct);
        return {
            id: id,
            ...snapshot.data(),
            ...updateProduct,
        };
    } catch (error) {
        console.error('Error al actualizar el producto: ', error);
        throw new Error('Error al actualizar el producto en la DB');
    }
};

export const deleteProductDB = async id => {
    try {
        const productRef = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return null;

        await deleteDoc(productRef);
        return {
            message: `Productos de ID: ${id} eliminado con exito`,
        };
    } catch (error) {
        console.error('Error al eliminar el producto: ', error);
        throw new Error('Error al eliminar el producto en la DB');
    }
};
