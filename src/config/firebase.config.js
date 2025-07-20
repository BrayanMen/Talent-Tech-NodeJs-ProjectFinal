import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import configEnv from './env.config.js';

const firebaseConfig = configEnv.firebase;

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export  {db};
