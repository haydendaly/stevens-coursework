import React, { useContext } from 'react';
import {
    Text, View, TouchableOpacity, StyleSheet, FlatList, Linking
} from 'react-native';
import { FontAwesome as Icon } from "@expo/vector-icons/";

import { ColorContext } from "../../functions/providers/ColorContext";
import styles from "../../styles/resourceStyles";
import generalStyles from "../../styles/generalStyles";
import Resource from "./Resource";

const emergency_resources = [
  {
    name: "National Suicide Prevention Lifeline",
    details: "Call 1-800-273-TALK (8255)",
    url: "tel:18002738255",
  },
  {
    name: "SAMHSA's National Helpline",
    details: "Call 1-800-661-HELP (4357)",
    url: "tel:18006614357",
  },
  {
    name: "Crisis Text Line",
    details: "Text \"HELLO\" to 741741",
    url: "sms:741741&body=HELLO",
  },
  {
    name: "Disaster Distress Helpline",
    details: "Text \"TalkWithUs\" to 66746", 
    url: "sms:66746&body=TalkWithUs",
    // or Call 1-800-985-5990
  },
];

export default function Emergency(props) {
    const { color } = useContext(ColorContext);
    const { navigation } = props;

    return (
      <View style={{ ...styles.container, backgroundColor: color.background}}>
        <FlatList //flatlist of categories
          style={{ width: "100%" }}
          contentContainerStyle={{ width: "95%", marginLeft: "2.5%", paddingBottom: 20 }}
          data={emergency_resources}
          renderItem={({ item }) => {
            return (
              <View 
                style={{
                  width: "100%", 
                  height: 75, 
                  backgroundColor: color.primary, 
                  borderRadius: 10, 
                  marginTop: 10,
                  ...generalStyles.shadow,
                  shadowColor: color.shadow,
                  padding: 10,
                  justifyContent: 'center'
                  // flexDirection: "row"
                }}
              >
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text
                    style={{ ...styles.title, color: color.primaryText }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ ...styles.source, color: color.inactive }}>
                    <Icon name="phone" color={color.primaryText} size={16} />&nbsp;
                    {item.details}&nbsp;<Icon name="chevron-right" color={color.primaryText} size={16} />
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
}
