import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCk4mpnYO76bWk2Xtkwe7d7swk8zvYtzf4",
    authDomain: "it-project-41c05.firebaseapp.com",
    projectId: "it-project-41c05",
    storageBucket: "it-project-41c05.appspot.com",
    messagingSenderId: "1025786507901",
    appId: "1:1025786507901:web:2ba1416ae910eb73897714"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire