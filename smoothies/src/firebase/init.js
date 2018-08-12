import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCVl3Rf6U3LAn9jQkrYuytp77ExRCnaiwY",
    authDomain: "vuejs-smoothies.firebaseapp.com",
    databaseURL: "https://vuejs-smoothies.firebaseio.com",
    projectId: "vuejs-smoothies",
    storageBucket: "vuejs-smoothies.appspot.com",
    messagingSenderId: "1017541413367"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});

export default firebaseApp.firestore();