// Import the functions from the SDKs
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";  //Autentificación de usuarios
import { getFirestore} from "firebase/firestore";





// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrrRIR23QCB9UBQSTbuxRHEFm5E3AkqLM",
  authDomain: "gestor-de-nomina.firebaseapp.com",
  projectId: "gestor-de-nomina",
  storageBucket: "gestor-de-nomina.appspot.com",
  messagingSenderId: "1034687261875",
  appId: "1:1034687261875:web:5a8f95c5fd27c4162054c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);

//utils
const auth = getAuth();
const db = getFirestore();




//export
export { auth, db}

