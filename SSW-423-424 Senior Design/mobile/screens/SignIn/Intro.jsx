import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "../../styles/introStyles";
import { ColorContext } from "../../functions/providers/ColorContext";

export default function Intro(props) {
  const { navigation } = props;
  const { color } = useContext(ColorContext);

  return (
    <View style={{ ...styles.container, backgroundColor: color.primary}}>
      <Text style={styles.headerText}>SSW 423 - Senior Design</Text>
      <Text style={styles.subHeaderText}>Mental Health Journaling Application</Text>
      <View style={{ height: 50 }} />
      <Text style={styles.bodyText}>Contributors: Angie, Brittany, Erik, Hayden, John, Olivia, and Scott</Text>
      <View style={{ height: 50 }} />
      <TouchableOpacity onPress={() => navigation.navigate("Name")}>
        <View style={{ ...styles.button, backgroundColor: color.background}}>
          <Text>Enter!</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Number")}>
        <Text style={styles.underlineText}>Already have an account, login</Text>
      </TouchableOpacity>
    </View>
  );
}
