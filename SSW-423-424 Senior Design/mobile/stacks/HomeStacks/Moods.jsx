import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Analysis from "../../screens/Moods/Analysis";
import Track from "../../screens/Moods/Track";

const Stack = createStackNavigator();

const Moods = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Analysis"
      defaultNavigationOptions={TransitionPresets.FadeFromBottomAndroid}
      screenOptions={{ headerShown: false }}
      gestureEnabled={false}
    >
      <Stack.Screen
        name="Analysis"
        component={Analysis}
        gestureEnabled={false}
      />
      <Stack.Screen
        name="Track"
        component={Track}
        gestureEnabled={false}
      />
    </Stack.Navigator>
  );
};

export default Moods;
