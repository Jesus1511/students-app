import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBUCUpXE7l28Ngsxp18aRWyWEZJ-0mKwZY",
  appId: "1:1027330058288:android:98c227544d2f60f07865f5",
  projectId: "students-app-90294",
  storageBucket: "students-app-90294.firebasestorage.app",
  //authDomain: "YOUR_AUTH_DOMAIN",
  //messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
};

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }
}

const firebase = new Firebase();
export const auth = initializeAuth(firebase.app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export default firebase;
