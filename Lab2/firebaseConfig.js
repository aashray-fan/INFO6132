import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBgmKbRbvWmS8yTGJhnb8PNVWljCITPZRk',
  authDomain: 'todo-snack.firebaseapp.com',
  projectId: 'todo-snack',
  storageBucket: 'todo-snack.appspot.com',
  messagingSenderId: '545326853242',
  appId: '1:545326853242:web:b5d48b370f658bf89b5fc3',
  measurementId: 'G-KGGB7T60HC',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const TODO_LIST = 'todo_list';
export const FB_DB_COLLECTION = firebase.firestore().collection(TODO_LIST);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
