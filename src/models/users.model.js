import { db } from "../config/firebase.config";

const COLLECTION_NAME = 'users';
const usersCollection = collection(db, COLLECTION_NAME);