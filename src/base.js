import Rebase from 're-base';   // mirror state to firebase
import firebase from 'firebase';

// create firebase app
const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyBGsbHqCHNgtHxYVo2U9Fwry_hrGhiOkH0",
  authDomain: "oh-my-cod.firebaseapp.com",
  databaseURL: "https://oh-my-cod.firebaseio.com",
  projectId: "oh-my-cod",
  storageBucket: "oh-my-cod.appspot.com",
  messagingSenderId: "460355775724",
  appId: "1:460355775724:web:1e74575dfb1594c5"
})

// create rebase bindings
const base = Rebase.createClass(firebaseApp.database());   // returns database

// name export
export { firebaseApp };

// default export
export default base;
