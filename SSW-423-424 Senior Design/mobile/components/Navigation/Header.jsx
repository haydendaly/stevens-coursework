import React, { useContext } from "react";
import {
    Text, View, StyleSheet
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { ColorContext } from "../../functions/providers/ColorContext";
import generalStyles from "../../styles/generalStyles"

export default function Header({ navigation }) {
    const { color } = useContext(ColorContext);

    // let title = navigation.state.routes[navigation.state.index].routeName;
    let title = "temp"
    return (
        <View style={[{ backgroundColor: color.primary }, title === "Moods" || title === "Profile" ? { ...generalStyles.shadow, shadowColor: color.shadow } : {} ]}>
            <SafeAreaView>
                <View style={[styles.container, { backgroundColor: color.primary }]}>
                    <Text style={[styles.text, { color: color.primaryText }]}>{title}</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        justifyContent: "center"
    },
    text: {
        marginLeft: 20,
        fontSize: 32,
        fontFamily: "regular"
    }
  });