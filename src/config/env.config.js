import dotenv from 'dotenv';
dotenv.config();

const configEnv = {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV,
    jwtoken: process.env.JWT_SECRET,
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.MEASUREMENT_ID
    },
};

if (configEnv.env === 'development') {
    configEnv.workEnviroment = process.env.DEV_URL;
} else {
    configEnv.workEnviroment = process.env.PROD_URL;
}

export default configEnv;