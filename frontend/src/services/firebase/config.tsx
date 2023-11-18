import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyCooCeic0iUVdvWlWxhnF1SPuJdEq9MvhY',
  authDomain: 'finalproject-69abc.firebaseapp.com',
  projectId: 'finalproject-69abc',
  storageBucket: 'finalproject-69abc.appspot.com',
  messagingSenderId: '234697218918',
  appId: '1:234697218918:web:aa7a9a1d474f77731d86a7',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
