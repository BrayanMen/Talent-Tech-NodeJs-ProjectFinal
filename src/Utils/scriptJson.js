import { collection } from 'firebase/firestore';
import { readFile } from './utils.js';
import { createProductsDB, searchProductsByNameDB } from '../models/products.model.js';
import { db } from '../config/firebase.config.js';

const postDataJSON = async () => {
    const COLLECTION_NAME = 'products';
    const productsCollection = collection(db, COLLECTION_NAME);
    try {
        const products = await readFile('data.json');
        console.log(products[1]);
        for (const product of products) {
            const productExist = await searchProductsByNameDB(product.name);
            if (productExist.length !== 0) {
                console.log(`Producto ${product.name} existente, no se duplico`);
                continue;
            }
            const newProduct = {
                ...product                
            };
            await createProductsDB(newProduct);
            console.log(`Productos ${product.name} creado`);
        }
        console.log(`Se hicieron todas las cargas`);
        process.exit(0);
    } catch (error) {
        console.error('Error en carga de datos: ', error);
        process.exit(1);
    }
};
// postDataJSON();
