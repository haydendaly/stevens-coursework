import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

import styles from "../../styles/signInStyles";
import { UserContext } from "../../functions/providers/UserContext";
import { ColorContext } from "../../functions/providers/ColorContext";

export default function Name(props) {
  const { navigation } = props;
  const { color } = useContext(ColorContext);
  const { newUser, setNewUser } = useContext(UserContext);
  const [name, setName] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ ...styles.container, backgroundColor: color.primary}}>
        <Text style={{ ...styles.headerText, color: color.primaryText}}>What's your name?</Text>
        <Text style={{ ...styles.subHeaderText, color: color.primaryText}}>
          This is what we'll call you inside the app and it won’t be shared with
          anyone.
        </Text>
        <TextInput
          placeholder="Johnny Appleseed"
          placeholderTextColor={color.inactive}
          style={{ fontSize: 20, padding: 20, paddingBottom: 15, paddingTop: 15, borderWidth: 1, borderRadius: 20, borderColor: color.primaryText }}
          onChangeText={setName}
        />
        <TouchableOpacity
          style={[
            { ...styles.button, backgroundColor: color.highlight}, 
            name.length > 2 ? {} : { backgroundColor: color.inactive },
          ]}
          onPress={() => {
            if (name.length > 2) {
              setNewUser({ ...newUser, name });
              navigation.navigate("Number");
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
        {/* <TouchableOpacity
          //onPress={() => navigation.goBack()}
          style={{ ...styles.signIn, backgroundColor: color.primary, marginLeft: 2, marginTop: 2}}
        >
            <Text style={{
              fontSize: 20,
              color: color.inactive
            }}>
              Sign In Here!
            </Text>
        </TouchableOpacity> */}
      </View>
    </TouchableWithoutFeedback>
  );
}


