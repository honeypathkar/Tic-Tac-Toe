import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAgUGO_lutX6lB-c3yDmP2gagQ1sB8hPu4",
  authDomain: "tic-tac-toe-2ead1.firebaseapp.com",
  projectId: "tic-tac-toe-2ead1",
  storageBucket: "tic-tac-toe-2ead1.appspot.com",
  messagingSenderId: "787808560247",
  appId: "1:787808560247:web:2e05ca981e6b0c29065272"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
