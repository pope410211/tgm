const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount');

console.log('service', serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://turtlegirlsmarket-64f1c.firebaseio.com'
});



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
