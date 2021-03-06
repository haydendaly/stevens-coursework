import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { ColorContext } from "../../functions/providers/ColorContext";

export default function Onboarding(props) {
  const { navigation } = props;
  const { color } = useContext(ColorContext);

  return (
    <View style={{ ...styles.container, backgroundColor: color.primary}}>
      <Text style={styles.headerText}>Onboarding Screen</Text>
      <View style={{ height: 50 }} />
      <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
        <View style={{ ...styles.button, backgroundColor: color.background}}>
          <Text>Enter!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  headerText: {
    fontSize: 24
  },
});
