import { db } from '../config/firebase.config.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
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
