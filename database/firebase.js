
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHI0xwwMm9E3e_8CbiGjAB9Ek_O5K4xNU",
  authDomain: "proyecto-contactos-648ea.firebaseapp.com",
  projectId: "proyecto-contactos-648ea",
  storageBucket: "proyecto-contactos-648ea.appspot.com",
  messagingSenderId: "824617325689",
  appId: "1:824617325689:web:1f30cf6a9905480f57b0a8"
};

const app = initializeApp(firebaseConfig);
   
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})

export default db;

