/* globals: Symbol */

import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCg7VBMh-xA5YrOiw_lQhP6UhlNkBZw3Ts',
  authDomain: 'dudo-fbce8.firebaseapp.com',
  databaseURL: 'https://dudo-fbce8.firebaseio.com',
  projectId: 'dudo-fbce8',
  storageBucket: 'dudo-fbce8.appspot.com',
  messagingSenderId: '829776130261',
  appId: '1:829776130261:web:e95ca8bb29b261a2'
}

firebase.initializeApp(config)

export default firebase
