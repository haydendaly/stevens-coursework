import React from 'react';
import {
    createStackNavigator,
    TransitionPresets
} from '@react-navigation/stack';

import Intro from '../screens/SignIn/Intro';
import Name from '../screens/SignIn/Name';
import Number from '../screens/SignIn/Number';
import Verify from '../screens/SignIn/Verify';

const Stack = createStackNavigator();

const SignIn = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Intro"
            headerShown={false}
            defaultNavigationOptions={{
                ...TransitionPresets.FadeFromBottomAndroid
            }}
        >
            <Stack.Screen
                name="Intro"
                component={Intro}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name="Name"
                component={Name}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name="Number"
                component={Number}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name="Verify"
                component={Verify}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
        </Stack.Navigator>
    );
};

export default SignIn;
