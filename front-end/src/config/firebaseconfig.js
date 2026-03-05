// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNfepsS_Ol3qAUbt_1j9CRF2Gl_RIiqLM",
    authDomain: "luufile-dc31e.firebaseapp.com",
    projectId: "luufile-dc31e",
    storageBucket: "luufile-dc31e.firebasestorage.app",
    messagingSenderId: "359688870362",
    appId: "1:359688870362:web:da020822dec94490c8c8e3",
    measurementId: "G-MCVHEGHJVY"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage
