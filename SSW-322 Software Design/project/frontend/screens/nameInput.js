/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Keyboard
} from 'react-native';
import users from '../functions/users';
import books from '../functions/books';
import { Global } from '../styles/Global';
// var uuid = require('uuid');

export default function NameInput({ navigation }) {
  const number = navigation.getParam('number');

  const [value, changeText] = React.useState('');
  const [errorMsg, changeErrorMsg] = React.useState('#eee')

  // var userID = uuid.v4();

  function doneTapped() {
    if (value.length > 1) {
      users.create(value, number, number, (data) => {
        AsyncStorage.setItem('userID', number);
        AsyncStorage.setItem('number', number);
        AsyncStorage.setItem('name', value);
        Keyboard.dismiss()
        books.getHomescreen(books => {
          navigation.navigate('HomeStack', {
            books: books,
            clubs: [],
            userID: number
          });
        })
      })
    } else {
      changeErrorMsg(text.length > 1 ? '#8b0000' : '#eee')
    }
  }
  return (
    <View style={Global.container}>
      <View style={Global.textContainer}>
        <Text style={Global.header}>What's your name?</Text>
        <Text style={Global.subHeader}>This is so your friends know who you are.</Text>
      </View>
      <TextInput style={Global.input}
        placeholder='Atticus Finch'
        textAlign={'center'}
        autoFocus={true}
        onChangeText={text => changeText(text)}
        value={value}
      />
      <TouchableOpacity
        style={Global.doneButton}
        activeOpacity={0.75}
        onPress={doneTapped}
      >
        <View>
          <Text style={Global.buttonText}>Done</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={{color: errorMsg}}>Invalid Input, Please Try Again</Text>
      </View>
    </View>
  );
}
