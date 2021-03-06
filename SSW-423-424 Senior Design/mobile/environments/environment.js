import Constants from 'expo-constants';

const ENV = {
    dev: {
        apiUrl: '/',
        firebaseConfig: {
            apiKey: 'AIzaSyC67DvT4kWLEn6QTi4hFz3rkjghqfsGOcg',
            authDomain: 'hodas-f14c5.firebaseapp.com',
            databaseURL: 'https://hodas-f14c5.firebaseio.com',
            projectId: 'hodas-f14c5',
            storageBucket: 'hodas-f14c5.appspot.com',
            messagingSenderId: '674328465447',
            appId: '1:674328465447:web:9a1d3d94857b0ce35fbe02',
            measurementId: 'G-P95D61LDBX'
        }
    },
    prod: {
        apiUrl: '/',
        firebaseConfig: {
            apiKey: 'AIzaSyC67DvT4kWLEn6QTi4hFz3rkjghqfsGOcg',
            authDomain: 'hodas-f14c5.firebaseapp.com',
            databaseURL: 'https://hodas-f14c5.firebaseio.com',
            projectId: 'hodas-f14c5',
            storageBucket: 'hodas-f14c5.appspot.com',
            messagingSenderId: '674328465447',
            appId: '1:674328465447:web:9a1d3d94857b0ce35fbe02',
            measurementId: 'G-P95D61LDBX'
        }
    }
};

export const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if (__DEV__) {
        console.log('Running in development mode.');
        return ENV.dev;
    } else {
        console.log('Running in production mode.');
        return ENV.prod;
    }
};
