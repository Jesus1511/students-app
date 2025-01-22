import { initializeApp } from 'firebase/app'; // Asegúrate de que estás usando la inicialización correcta de Firebase
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUCUpXE7l28Ngsxp18aRWyWEZJ-0mKwZY",
  appId: "1:1027330058288:android:98c227544d2f60f07865f5",
  projectId: "students-app-90294",
  storageBucket: "students-app-90294.firebasestorage.app",
  //authDomain: "YOUR_AUTH_DOMAIN",
  //messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
};

// Inicialización de Firebase y Firestore
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firestore, auth };
