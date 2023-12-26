// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDcnAI5pLRYqGQ97MtG8o8DMKpM9gzJFWs',
  authDomain: 'house-marketplace-app-18ef3.firebaseapp.com',
  projectId: 'house-marketplace-app-18ef3',
  storageBucket: 'house-marketplace-app-18ef3.appspot.com',
  messagingSenderId: '867723659778',
  appId: '1:867723659778:web:31cc7f3f0dd3436d5e751b',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
