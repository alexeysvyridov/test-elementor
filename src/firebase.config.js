import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyBiXwpQqu9-5mOGkU_4x2j1mc562dQ-ST4",
  authDomain: "elementor-app.firebaseapp.com",
  projectId: "elementor-app",
  storageBucket: "elementor-app.appspot.com",
  messagingSenderId: "974994164253",
  appId: "1:974994164253:web:9d4932b5ac5591b34a14f4"
};

 firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;