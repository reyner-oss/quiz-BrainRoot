const firebase = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCR0Ic5FUvhVCouJvrQl748VwKRtpgfnSE",
  authDomain: "reyproject-3536d.firebaseapp.com",
  projectId: "reyproject-3536d",
  storageBucket: "reyproject-3536d.appspot.com",
  messagingSenderId: "1026538713270",
  appId: "1:1026538713270:web:66c4015be1ed884327b617",
  measurementId: "G-ES2WXVJN7G",
};

firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

module.exports = { auth, db };

