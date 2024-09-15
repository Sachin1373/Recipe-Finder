import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAVuxTf_EBAxbsL1-oqbyRYzaP3Jd3rM2Y",
  authDomain: "recipe-finder-12d9c.firebaseapp.com",
  projectId: "recipe-finder-12d9c",
  storageBucket: "recipe-finder-12d9c.appspot.com",
  messagingSenderId: "589427369732",
  appId: "1:589427369732:web:fe500ad6ae7fc191b85251",
  measurementId: "G-DQTKGJ0PDY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
