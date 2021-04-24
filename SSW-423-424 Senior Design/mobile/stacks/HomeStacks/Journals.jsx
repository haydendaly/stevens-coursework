import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Recent from "../../screens/Journals/Recent";
import Starred from "../../screens/Journals/Starred";
import Private from "../../screens/Journals/Private";
import Journal from "../../screens/Journals/Journal";
import Track from "../../screens/Moods/Track";
import { ColorContext } from "../../functions/providers/ColorContext";
import generalStyles from "../../styles/generalStyles";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const JournalsTabs = () => {
  const { color } = useContext(ColorContext);

  return (
    <Tab.Navigator
      initialRouteName="Recent"
      timingConfig={0}
      upperCaseLabel={false}
      tabBarOptions={{
        activeTintColor: color.highlight,
        inactiveTintColor: color.primaryText,
        style: {
          backgroundColor: color.primary,
          ...generalStyles.shadow,
          shadowColor: color.shadow,
        },
        header: {
          style: {
            shadowColor: "transparent",
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            elevation: 0
          }
        },
        labelStyle: {
          fontSize: 17,
          fontFamily: "medium",
          textTransform: "none",
        },
        indicatorStyle: {
          backgroundColor: color.highlight,
        },
      }}
    >
      <Tab.Screen name="Recent" component={Recent} />
      <Tab.Screen name="Starred" component={Starred} />
      <Tab.Screen name="Private" component={Private} />
    </Tab.Navigator>
  );
};

const Journals = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Journals"
      defaultNavigationOptions={{
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    >
      <Stack.Screen name="Journals" component={JournalsTabs} />
      <Stack.Screen name="Journal" component={Journal} />
      <Stack.Screen name="TrackJournal" component={Track} />
    </Stack.Navigator>
  );
};

export default Journals;
