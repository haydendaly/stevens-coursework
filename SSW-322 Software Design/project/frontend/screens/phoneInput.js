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
  TextInput
} from 'react-native';
import users from "../functions/users";
import { Global } from '../styles/Global';

export default function PhoneInput({ navigation }) {
  const [number, setNumber] = React.useState("");
  const [errorMsg, changeErrorMsg] = React.useState("#eee");

  const doneTapped = () => {
    let text = number;
    if (text.length == 10) {
      users.phoneAuth(text, data => {
        if (data) {
            navigation.navigate("TextVerification", {
              code: data.code,
              number: text
            });
          } else {
            changeErrorMsg('#8b0000');
          }
      });
    } else {
      changeErrorMsg(text.length > 10 ? "#8b0000" : "#eee");
    }
  };

  return (
    <View style={Global.container}>
      <View style={Global.textContainer}>
        <Text style={Global.header}>What's your number?</Text>
        <Text style={Global.subHeader}>We just need your number for verification and won't spam you or sell your data.</Text>
      </View>
      <TextInput
        style={Global.input}
        keyboardType={"phone-pad"}
        placeholder="(123)-456-7890"
        textAlign={"center"}
        autoFocus={true}
        autoCompleteType={"tel"}
        onChangeText={val => setNumber(val)}
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
        <Text style={{ color: errorMsg }}>Invalid Input, Please Try Again</Text>
      </View>
    </View>
  );
}
