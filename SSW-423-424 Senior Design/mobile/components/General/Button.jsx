import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 as FA5Icon } from "@expo/vector-icons/";

import { ColorContext } from "../../functions/providers/ColorContext";
import styles from "../../styles/signInStyles";
import generalStyles from "../../styles/generalStyles"

export default function Button(props) {
  const { onPress, size, icon } = props;
  const { color } = useContext(ColorContext);
  
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, generalStyles.shadow, { backgroundColor: color.highlight, shadowColor: color.shadow }]}>
      <FA5Icon name={icon} color={color.primary} size={size} />
    </TouchableOpacity>
  );
}
