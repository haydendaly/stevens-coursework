import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  AsyncStorage,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { UserContext } from "../../functions/providers/UserContext";
import { ColorContext } from "../../functions/providers/ColorContext";
import styles from "../../styles/signInStyles";

const SignIn = () => {
  const { pin } = useContext(UserContext)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ ...styles.container, backgroundColor: color.primary}}>
        <Text style={{ ...styles.headerText, color: color.primaryText}}>What's your PIN number?</Text>
        <Text style={{ ...styles.subHeaderText, color: color.primaryText}}>
          Please enter the PIN number associated with your account
        </Text>
        <TextInput
          placeholder="123456"
          placeholderTextColor={color.inactive}
          keyboardType="number-pad"
          style={{ fontSize: 20 }}
          //read the pin that is entered
          onChangeText={setCode} 
        />
        <TouchableOpacity
          style={[
            { ...styles.button, backgroundColor: color.highlight},
            code.length > 5
              ? { backgroundColor: "red" }
              : { backgroundColor: color.inactive },
          ]}
          onPress={() => {
            if (code.length > 5 && code !== pin) {
              Alert.alert("Not correct pin");
            }
          }}
        >
          <Icon
            name="chevron-right"
            color={color.primary}
            size={28}
            style={{ marginLeft: 3, marginTop: 2 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignIn
