import { db } from '../config/firebase.config.js';
import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'users';
const usersCollection = collection(db, COLLECTION_NAME);

export const getAllUsersDB = async () => {
    try {
        const snapshot = await getDocs(usersCollection);
        let users = snapshot.docs.map(u => {
            const data = u.data();
            return {
                id: u.id,
                ...data,
                createdAt: data.createdAt?.seconds
                    ? new Date(data.createdAt.seconds * 1000).toISOString()
                    : null,
                updatedAt: data.updatedAt?.seconds
                    ? new Date(data.updatedAt.seconds * 1000).toISOString()
                    : null,
            };
        });
        return {
            users,
            lastUser: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null,
        };
    } catch (error) {
        console.error('Error al capturar los usuarios: ', error);
        throw new Error('Error al traer los usuarios de la Base de Datos');
    }
};

export const getUserByEmailDB = async email => {
    try {
        const queryEmail = query(usersCollection, where('email', '==', email));
        const snapshot = await getDocs(queryEmail);

        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.seconds
                ? new Date(data.createdAt.seconds * 1000).toISOString()
                : null,
            updatedAt: data.updatedAt?.seconds
                ? new Date(data.updatedAt.seconds * 1000).toISOString()
                : null,
        };
    } catch (error) {
        console.error('Error al capturar producto por email: ', error);
        throw new Error('Error al traer el producto de la Base de Datos');
    }
};

export const createUserDB = async userData => {
    try {
        if (!userData.email || !userData.password) {
            throw new Error('Los campos de correo y contraseña son obligatorios');
        }
        const userRef = doc(usersCollection);
        await setDoc(userRef, {
            ...userData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
        return {
            id: userRef.id,
            ...userData,
        };
    } catch (error) {
        console.error('Error al crear el usuario: ', error);
        throw new Error('Error al crear el usuario en la DB');
    }
};

export const getUserByIdDB = async id => {
    try {
        const docID = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docID);
        if (!snapshot.exists()) {
            throw new Error(`El usuario de ID: ${id} no existe`);
        }
        const data = snapshot.data();
        return {
            id: id,
            ...data,
            createdAt: data.createdAt?.seconds
                ? new Date(data.createdAt.seconds * 1000).toISOString()
                : null,
            updatedAt: data.updatedAt?.seconds
                ? new Date(data.updatedAt.seconds * 1000).toISOString()
                : null,
        };
    } catch (error) {
        console.error('Error al capturar usuario por id: ', error);
        throw new Error('Error al traer el usuario de la Base de Datos');
    }
};

export const updateUserDB = async (id, userData) => {
    try {
        const docID = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docID);

        if (!snapshot.exists()) {
            throw new Error(`El usuario de ID: ${id} no existe`);
        }

        const updateUser = {
            ...userData,
            updatedAt: Timestamp.now(),
        };
        await updateDoc(docID, updateUser);
        return {
            id: id,
            ...snapshot.data(),
            ...updateUser,
        };
    } catch (error) {
        console.error('Error al actualizar el usuario: ', error);
        throw new Error('Error al actualizar el usuario en la DB');
    }
};

export const deleteUserDB = async id => {
    try {
        const docID = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docID);

        if (!snapshot.exists()) {
            throw new Error(`El usuario de ID: ${id} no existe`);
        }

        await deleteDoc(docID);
        return {
            message: `Usuario de ID: ${id} eliminado con exito`,
        };
    } catch (error) {
        console.error('Error al eliminar el Usuario: ', error);
        throw new Error('Error al eliminar el usuario en la DB');
    }
};

export const updateWishlistDB = async (userId, productId, action) => {
    try {
        const userReF = doc(db, COLLECTION_NAME, userId);
        if (action === 'add') {
            await updateDoc(userReF, {
                wishlist: arrayUnion(productId),
            });
        }else if(action=== 'remove'){
            await updateDoc(userReF,{
                wishlist: arrayRemove(productId)
            })
        }else{
            throw new Error('Accion invalida en el lista de favoritos')
        }
        const updatedDoc = await getDoc(userReF);
        return{
            message: 'Favoritos Actualizados',
            data: updatedDoc.data().wishlist || [],
        }
    } catch (error) {
        console.error('Error al actualizar favoritos:', error);
        throw new Error('Error al actualizar favoritos');
    }
};
