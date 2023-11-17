import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
