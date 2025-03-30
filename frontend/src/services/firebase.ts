// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6wfFCnqDuLSLCt9-RhDvkYx7IAd7TOzM",
    authDomain: "innerjourney-c007e.firebaseapp.com",
    projectId: "innerjourney-c007e",
    storageBucket: "innerjourney-c007e.firebasestorage.app",
    messagingSenderId: "975065734812",
    appId: "1:975065734812:web:e1b61ec63dcebbea7b1759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);