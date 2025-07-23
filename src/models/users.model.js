import { db } from '../config/firebase.config.js';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

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
        const snapshot = await getDoc(queryEmail);
        if (!snapshot.exists()) throw new Error(`El usuario del email: ${email} no existe`);
        const data = snapshot.data();
        return {
            user: {
                id: snapshot.id,
                ...data,
                createdAt: data.createdAt?.seconds
                    ? new Date(data.createdAt.seconds * 1000).toISOString()
                    : null,
                updatedAt: data.updatedAt?.seconds
                    ? new Date(data.updatedAt.seconds * 1000).toISOString()
                    : null,
            },
        };
    } catch (error) {
        console.error('Error al capturar producto por email: ', error);
        throw new Error('Error al traer el producto de la Base de Datos');
    }
};
