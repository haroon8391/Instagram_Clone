import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "insta-clone-ff165.firebaseapp.com",
    projectId: "insta-clone-ff165",
    storageBucket: "insta-clone-ff165.appspot.com",
    messagingSenderId: "555320694229",
    appId: "1:555320694229:web:e20030d4fcc89c7c61595c"
};

const app = initializeApp(firebaseConfig);
export default app;