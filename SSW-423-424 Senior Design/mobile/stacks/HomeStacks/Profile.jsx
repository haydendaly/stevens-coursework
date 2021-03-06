import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Settings from "../../screens/Profile/Settings";

const Stack = createStackNavigator();

const Profile = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      defaultNavigationOptions={TransitionPresets.FadeFromBottomAndroid}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;
