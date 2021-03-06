import React, { useState, useRef, useContext, useEffect } from "react";
import { FontAwesome as Icon } from "@expo/vector-icons/";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import * as Linking from "expo-linking";

import styles from "../../styles/resourceStyles";
import generalStyles from "../../styles/generalStyles";
import { ColorContext } from "../../functions/providers/ColorContext";

export default function Resource(props) {
  const { item } = props;
  const { color } = useContext(ColorContext);
  const [open, setOpen] = useState(true);
  const spinValue = new Animated.Value(1);
  const spinValueRef = useRef(spinValue);

  const rotate = spinValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const toggle = () => {
    Animated.timing(spinValueRef.current, {
      toValue: open ? 0 : 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setOpen(!open);
    });
  };

  return (
    <View
      style={{
        ...styles.categoryContainer,
        backgroundColor: color.primary,
        ...generalStyles.shadow,
        shadowColor: color.shadow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={{ ...styles.category, color: color.primaryText }}>
          {item.name}
        </Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <TouchableOpacity onPress={toggle}>
            <Icon name="chevron-up" color={color.primaryText} size={32} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      {open && (
        <View
          style={{
            ...styles.contentContainer,
            borderTopColor: color.primaryText,
          }}
        >
          <FlatList
            style={{ width: "95%" }}
            data={item.contents}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {/* <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      paddingRight: 5,
                    }}
                  >
                    <Icon name="star" color={color.primaryText} size={28} />
                  </TouchableOpacity> */}
                  <View
                    style={{
                      ...styles.categoryContainer,
                      backgroundColor: color.primary,
                    }}
                  >
                    <TouchableOpacity>
                      <Text
                        style={{ ...styles.title, color: color.primaryText }}
                        onPress={() => Linking.openURL(item.url)}
                      >
                        {item.title}
                      </Text>
                      <Text style={{ ...styles.source, color: color.inactive }}>
                        {item.source}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
