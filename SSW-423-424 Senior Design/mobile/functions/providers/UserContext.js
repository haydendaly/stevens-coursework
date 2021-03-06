import React, { useState, useEffect, createContext, useMemo } from 'react';
import { AsyncStorage } from 'react-native';
import * as fb from 'firebase';
import 'firebase/firestore';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
const { mp } = require('../util/mixpanel');

dayjs.extend(utc);

import { firebase } from '../util/firebase';

// getTimestamp function creates timestamp upon creation of new journal entry, stores in firebase as timezone sensitive date in ISO 8601 format

const db = firebase.firestore();
const getTimestamp = () => dayjs().local().format();
//OLD: const getTimestamp = () => fb.firestore.FieldValue.serverTimestamp();



export const useUser = () => {

  // store userID
  const [userID, setUserID] = useState('none');
  // stores user object
  const [user, setUser] = useState({});

  // storing user fields for sign in sequence
  const [newUser, setNewUser] = useState({});
  const [journals, setJournals] = useState([]);
  const [moods, setMoods] = useState([]);
  const [awards, setAwards] = useState([]);
  const [pin, setPin] = useState({});
  const [authCode, setAuthCode] = useState('hello');

  // Gets userID from phone's storage (we just use hardcoded rn) and calls getUser, getJournals, getMoods
  useEffect(() => {
    AsyncStorage.getItem('userID', (err, id) => {
        id = id ? id : 'none';
        setUserID(id);
        getUser(id);
        getJournals(id);
        getMoods(id);
        getAwards(id);
        getPin(id);
    });
  }, []);

  // Gets user by id
  const getUser = (id) => {
      db.collection('users')
          .doc(id)
          .get()
          .then((doc) => {
              if (doc.exists) {
                  const userData = doc.data();
                  setUser(userData);

                  mp.identify(id);
                  mp.people_set(userData);
                  mp.track("Open App", userData);
              }
          });
  };

  // Gets user by id
  const doesUserExist = (number, callback) => {
      db.collection('users')
          .where('number', '==', number)
          .get()
          .then(async (querySnapshot) => {
              let users = [];
              await querySnapshot.forEach((snapshot) => {
                  users.push({ ...snapshot.data(), id: snapshot.id });
              });
              callback(users);
          })
          .catch((err) => console.log('ERR', err));
  };

  // Gets journals by user id
  const getJournals = (id) => {
      db.collection('users')
          .doc(id)
          .collection('journals')
          .get()
          .then((querySnapshot) => {
              let journalsData = [];
              querySnapshot.forEach((snapshot) => {
                  journalsData.push({
                      id: snapshot.id,
                      ...snapshot.data()
                  });
              });
              let journalData = journalsData.map((journal) => ({
                  ...journal,
                  timeCreated: journal.timeCreated
                      ? // 2EB: Checks whether timestamp for timeCreated exists
                        journal.timeCreated
                      : getTimestamp(),
                  lastUpdated: journal.lastUpdated
                      ? // 3EB: Checks whether timestamp for lastUpdated exists
                        journal.lastUpdated
                      : getTimestamp()
              }));
              setJournals(
                  journalData.sort((a, b) => b.timeCreated - a.timeCreated)
              );
          });
  };

  // Gets moods by user id
  const getMoods = (id) => {
    db.collection("users")
      .doc(id)
      .collection("moods")
      .get()
      .then((querySnapshot) => {
        let moodsData = [];
        querySnapshot.forEach((snapshot) => {
          let moodData = snapshot.data();
          moodsData.push({...moodData, id: snapshot.id});
        });
        setMoods(
          moodsData.map((mood) => ({
            ...mood,
            timeCreated: mood.timeCreated
              ? // Checks whether timestamp for timeCreated exists
                mood.timeCreated
              : getTimestamp(),
          }))
        );
      });
  };

  // Gets mood by id
  const getMood = (id, moodID, callback) => {
    db.collection("users")
      .doc(id)
      .collection("moods")
      .doc(moodID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const moodData = doc.data();
          callback({ ...moodData, id: doc.id })
        }
        callback({})
      });
  };

  // create awards -- pass award gained through this function and into the db
  const createAward = (award, id) => {
    for (a of awards) {
      if (a.id == award.id) return;
    }
    db.collection('users')
      .doc(id)
      .collection('awards')
      .add(award)
      .then(() => {
        getAwards(id)
      })
  }

  // Gets awards by user id
  const getAwards = (id) => {
      db.collection('users')
          .doc(id)
          .collection('awards')
          .get()
          .then((querySnapshot) => {
              let awardsData = [];
              querySnapshot.forEach((snapshot) => {
                  awardsData.push(snapshot.data());
              });
              setAwards(awardsData);
          });
  };

  // Creates user document in users collection on firebase (can use hardcoded data to test!)
  const createUser = () => {
      const userData = {
          ...newUser,
          pin: 1234,
          color: 'default',
          metrics: ['mood', 'anxiety', 'energy', 'stress']
      };
      db.collection('users')
          .add(userData)
          .then((doc) => {
              setUserID(doc.id);
              AsyncStorage.setItem('userID', doc.id);
              setUser(userData);
          });
  };

  const login = (data) => {
      setUserID(data.id);
      AsyncStorage.setItem('userID', data.id);
      setUser(data);
  };

  // Creates journal document in userID's journal collection on firebase (can use hardcoded data to test!)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  // EB NOTES: Maybe we can add a method call within createJournal that calls a custom createMood method, which instead of using anxiety, stress, etc as parameters, it will just use 
  // 5's for each by default

  const createJournal = (id, callback) => {
      const data = {
          title: '',
          body: '',
          private: false,
          starred: false,
          lastUpdated: getTimestamp(),
          timeCreated: getTimestamp()
      };

      mp.track('Create journal', data);
      db.collection('users')
          .doc(id)
          .collection('journals')
          .add(data)
          .then((doc) => {
              callback({
                  id: doc.id,
                  ...data,
                  // OLD: New date()
                  // 5EB: two constants store timestamp in firebase aqcuired from top function getTimestamp(), displayed in journal UI
                  lastUpdated: getTimestamp(),
                  timeCreated: getTimestamp()
              });
          });
  };

//   const newCreateMood = (userID, callback) => {
//     db.collection('users')
//         .doc(userID)
//         .collection('moods')
//         .add({
//           activity: 5, 
//           anxiety: 5, 
//           energy: 5, 
//           stress: 5,
//           timeCreated: getTimestamp()
//       })
//         .then(() => {
//             getMoods(userID)
//             callback()
//         })
// };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  // Updates user object by userID with new partial object, new fields can look like { color: "red", phoneNumber: "newnumberlol" }
  const updateUser = (id, newFields) => {
      db.collection('users').doc(id).update({
          // not quite sure how to access dictionary then update
      });
  };

  // Updates journal object by userID and journalID with new partial object, new fields can look like { private: true, body: "something different" }
  const updateJournal = (userID, journalID, title, body) => {
      mp.track('Update journal', { journalID, title, body });

      db.collection('users')
          .doc(userID)
          .collection('journals')
          .doc(journalID)
          .update({
              title,
              body,
              lastUpdated: getTimestamp()
          })
          .then(() => {
              getJournals(userID);
          });
  };

  // Creates mood document in userID's mood collection on firebase (can use hardcoded data to test!)
  const createMood = (
      userID,
      anxiety,
      energy,
      activity,
      stress,
      callback
  ) => {
      const data = {
          activity,
          anxiety,
          energy,
          stress,
          timeCreated: getTimestamp()
      };

      mp.track('Create mood', data);

      db.collection('users')
          .doc(userID)
          .collection('moods')
          .add(data)
          .then(() => {
              getMoods(userID);
              callback();
          });
  };

  const updateMood = (userID, moodID, anxiety, energy, activity, stress) => {
    db.collection('users')
        .doc(userID)
        .collection('moods')
        .doc(moodID)
        .update({
          activity, 
          anxiety, 
          energy, 
          stress
      })
        .then(() => {
            getMoods(userID)
        })
};

  const auth = (number) => {
      const url =
          'https://us-central1-hodas-f14c5.cloudfunctions.net/widgets/auth';

      let formData = JSON.stringify({ number: `+1${number}` });

      fetch(url, {
          headers: {
              'Content-Type': 'application/json'
          },
          body: formData,
          method: 'POST'
      })
          .then((data) => {
              return data.json();
          })
          .then((res) => setAuthCode(res.code))
          .catch((error) => console.log(error));
  };

  //get the PIN tied to user
  const getPin = (id) => {
      db.collection('users')
          .doc(id)
          .get()
          .then((doc) => {
              if (doc.exists) {
                  const userData = doc.data();
                  setPin(userData.pin);
              }
          });
  };

  const starJournal = (userID, journalID, starred) => {
      mp.track('Star journal', { journalID, starred });

      db.collection('users')
          .doc(userID)
          .collection('journals')
          .doc(journalID)
          .update({
              starred
          })
          .then(() => {
              getJournals(userID);
          });
  };

  const lockJournal = (userID, journalID, locked) => {
      mp.track('Lock journal', { journalID, locked });

      db.collection('users')
          .doc(userID)
          .collection('journals')
          .doc(journalID)
          .update({
              private: locked
          })
          .then(() => {
              getJournals(userID);
          });
  };

  const deleteJournal = (userID, journalID) => {
      mp.track('Delete Journal', { journalID });

      db.collection('users')
          .doc(userID)
          .collection('journals')
          .doc(journalID)
          .delete()
          .then(() => {
              getJournals(userID);
          });
  };

  return {
      user,
      userID,
      journals,
      moods,
      newUser,
      setUser,
      setUserID,
      setNewUser,
      getMood,
      getUser,
      updateUser,
      createUser,
      updateJournal,
      createJournal,
      starJournal,
      lockJournal,
      deleteJournal,
      auth,
      authCode,
      awards,
      pin,
      doesUserExist,
      login,
      createMood,
      updateMood,
      getAwards,
      createAward
  };
};

export const UserContext = createContext('');

export const User = ({ children }) => {
  const {
    user,
    userID,
    journals,
    moods,
    newUser,
    setUser,
    getMood,
    setUserID,
    setNewUser,
    updateUser,
    createUser,
    updateJournal,
    createJournal,
    starJournal,
    lockJournal,
    deleteJournal,
    auth,
    authCode,
    awards,
    pin,
    doesUserExist,
    login,
    createMood,
    updateMood,
    getAwards,
    createAward,
  } = useUser();

  const userProvider = useMemo(
    () => ({
      user,
      userID,
      journals,
      moods,
      newUser,
      setUser,
      getMood,
      setUserID,
      setNewUser,
      updateUser,
      createUser,
      updateJournal,
      createJournal,
      starJournal,
      lockJournal,
      deleteJournal,
      auth,
      authCode,
      awards,
      pin,
      doesUserExist,
      login,
      createMood,
      updateMood,
      getAwards,
      createAward
    }),
    [
      user,
      userID,
      journals,
      moods,
      newUser,
      setUser,
      getMood,
      setUserID,
      setNewUser,
      updateUser,
      createUser,
      updateJournal,
      createJournal,
      starJournal,
      lockJournal,
      deleteJournal,
      auth,
      authCode,
      awards,
      pin,
      doesUserExist,
      login,
      updateMood,
      getAwards,
      createAward
    ]
  );

  return (
    <UserContext.Provider value={userProvider}>{children}</UserContext.Provider>
  );
};
