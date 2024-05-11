import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "insta-clone-ff165.firebaseapp.com",
    projectId: "insta-clone-ff165",
    storageBucket: "insta-clone-ff165.appspot.com",
    messagingSenderId: "555320694229",
    appId: "1:555320694229:web:e20030d4fcc89c7c61595c"
};

export const app = initializeApp(firebaseConfig);

// service firebase.storage {
//     match / b / { bucket } / o {
//         match / { allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//                 request.resource.contentType.matches('image/.*')
//     }
//     }
// }