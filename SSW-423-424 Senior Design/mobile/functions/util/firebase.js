import * as fb from 'firebase';

export const config = {
    apiKey: "AIzaSyC67DvT4kWLEn6QTi4hFz3rkjghqfsGOcg",
    authDomain: "hodas-f14c5.firebaseapp.com",
    databaseURL: "https://hodas-f14c5.firebaseio.com",
    projectId: "hodas-f14c5",
    storageBucket: "hodas-f14c5.appspot.com",
    messagingSenderId: "674328465447",
    appId: "1:674328465447:web:9a1d3d94857b0ce35fbe02",
    measurementId: "G-P95D61LDBX",
};

export const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();