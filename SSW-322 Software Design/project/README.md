# Atticus
This is a fullstack app based out group reading built for SSW 322 (Software Design Evolution). The app is named Atticus (after the literary character) and allows for people to construct "clubs" based around chosen books and invite others to read with them and track progress.

## Getting Started
The stack of the app is a frontend built on React Native with a backend built on Node.js. The backend is connected to a database running on MongoDB Atlas and a Cloud Firestore running on Firebase. The book data is currently being pulled from the Goodreads API and has plans to either migrate to Google Books API or build an impromptu one of its own.

### Running Backend
To run the backend, ensure that you have npm installed. To start, enter the backend directory and run

```
npm install
npm start
```

And the server will be running locally on ```localhost:3000```. Routes have not been documented but can be viewed if you go to the ```./routes``` directory and view the ```books.js```, ```clubs.js```, and ```users.js```.

### Running Frontend
To run the frontend, ensure that you have Expo, npm, and yarn installed, To start, enter the frontend directory and run

```
npm install
yarn install
expo install react-navigation-stack react-native-safe-area-context react-native-gesture-handler react-native-screens @react-native-community/masked-view
expo start
```
And then to use the app, you can either run in Android Studio, iOS Simulator, web, or locslly on your device through the Expo app.
