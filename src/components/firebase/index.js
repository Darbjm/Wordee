import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAaiDKyEf4i8kjY8hzIME1e7x4aVNN1pIU',
  authDomain: 'wordee-67989.firebaseapp.com',
  databaseURL: 'https://wordee-67989.firebaseio.com',
  projectId: 'wordee-67989',
  storageBucket: 'wordee-67989.appspot.com',
  messagingSenderId: '101028235095',
  appId: '1:101028235095:web:7df911b649491181ff6012',
  measurementId: 'G-XNY3X7YFD0'
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }