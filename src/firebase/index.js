import {initializeApp} from 'firebase/app';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDgrG6c-u9QEt4gsQzbrKRG64dvgl8d_yM",
  authDomain: "image-upload-fabbf.firebaseapp.com",
  projectId: "image-upload-fabbf",
  storageBucket: "image-upload-fabbf.appspot.com",
  messagingSenderId: "1045668997135",
  appId: "1:1045668997135:web:36819094e1cc3113d8db7a",
  measurementId: "G-24WL9KTNTN"
};
const firebase=initializeApp(firebaseConfig)
const storage = getStorage(firebase);
export{storage,firebase as default};