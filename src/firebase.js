import firebase  from "firebase/app";
import 'firebase/auth';
import 'firebase/firebase-firestore';



  const firebaseConfig = {
    apiKey: "AIzaSyBZCFVlze3qLTrLcTQEbbRn6ewAeX3uXZs",
    authDomain: "vfaculty-6a60b.firebaseapp.com",
    projectId: "vfaculty-6a60b",
    storageBucket: "vfaculty-6a60b.appspot.com",
    messagingSenderId: "337649609730",
    appId: "1:337649609730:web:75ce8ee1596d2bc5294b1b"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

export {
  auth,
  db
}