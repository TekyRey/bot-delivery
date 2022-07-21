const firebase = require('firebase')
firebaseConfig = {
  apiKey: "AIzaSyBJBnYqkFNI-RdYUGiT9lSPtAyXCNwVHSI",
  authDomain: "kiwibot-32fd0.firebaseapp.com",
  projectId: "kiwibot-32fd0",
  storageBucket: "kiwibot-32fd0.appspot.com",
  messagingSenderId: "332044005119",
  appId: "1:332044005119:web:85ecbc7e4531d63f8a66ca",
  measurementId: "G-G4QKBJRKBR"
};
firebase.initializeApp(firebaseConfig)
module.exports = { firebase };
