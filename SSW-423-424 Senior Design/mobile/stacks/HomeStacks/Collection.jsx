import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Collection from "../../screens/Collection/Collection";

const Stack = createStackNavigator();

const CollectionStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Collection"
      defaultNavigationOptions={TransitionPresets.FadeFromBottomAndroid}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Collection"
        component={Collection}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CollectionStack;
