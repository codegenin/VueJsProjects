import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCcaMrGW7kcufUxH0x6Vw4c5Qcukgig874",
  authDomain: "geolocation-b33ea.firebaseapp.com",
  databaseURL: "https://geolocation-b33ea.firebaseio.com",
  projectId: "geolocation-b33ea",
  storageBucket: "geolocation-b33ea.appspot.com",
  messagingSenderId: "388311639119"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});

export default firebaseApp.firestore();
