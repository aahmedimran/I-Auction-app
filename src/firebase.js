// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCADqUEACqxrIQtZwMuIxY17gAeHcSkQlk",
  authDomain: "i-auction-app.firebaseapp.com",
  projectId: "i-auction-app",
  storageBucket: "i-auction-app.appspot.com",
  messagingSenderId: "640616598184",
  appId: "1:640616598184:web:1cc5861301967d3288909d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Create a storage reference from our storage service
const storageRef = ref(storage);
export { auth,db,storage,storageRef };
