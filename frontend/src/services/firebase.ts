import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "din-api-nyckel",
    authDomain: "innerjourney-c007e.firebaseapp.com",
    projectId: "innerjourney-c007e",
    storageBucket: "innerjourney-c007e.appspot.com",
    messagingSenderId: "975065734812",
    appId: "din-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;