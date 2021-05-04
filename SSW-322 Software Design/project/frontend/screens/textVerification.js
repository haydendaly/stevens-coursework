/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage,
  Keyboard
} from 'react-native';
import users from "../functions/users";
import books from "../functions/books";
import { Global } from '../styles/Global';

export default function PhoneInput({ navigation }) {
  const number = navigation.getParam('number');
  const code = navigation.getParam('code');

  const [value, changeText] = React.useState('');
  const [errorMsg, changeErrorMsg] = React.useState('#eee')

  function onChangeText(text) {
    changeText(text);
    if (text == code) {
      users.get(number, data => {
        if (data) {
          AsyncStorage.setItem('userID', number);
          AsyncStorage.setItem('number', number);
          AsyncStorage.setItem('name', data.name);
          Keyboard.dismiss()
          books.getHomescreen(books => {
            users.getClubs('temp', true, clubs => {
              navigation.navigate('HomeStack', {
                books: books,
                clubs: clubs,
                userID: number
              });
            })
          })
        } else {
          navigation.navigate('NameInput', {
            number: number
          });
        }
      })
    } else {
      changeErrorMsg(text.length > 5 ? '#8b0000' : '#eee')
    }
  }

  return (
    <View style={Global.container}>
      <View style={Global.textContainer}>
        <Text style={[Global.header, {fontWeight: '700'}]}>What's your code?</Text>
        <Text style={[Global.subHeader,{fontWeight: '500'}]}>You should shortly receive an SMS verification code.</Text>
      </View>
      <TextInput style={Global.input}
        keyboardType={'phone-pad'}
        placeholder='123456'
        textAlign={'center'}
        autoFocus={true}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <View>
        <Text style={{color: errorMsg}}>Invalid Input, Please Try Again</Text>
      </View>
    </View>
  );
}
