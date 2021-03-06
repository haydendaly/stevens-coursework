import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import _ from 'lodash';

import SignInStack from './SignIn';
import HomeStack from './Home';
import LoadingScreen from '../screens/LoadingScreen';
import { showNav } from '../functions/util/navigation';

import { ColorContext } from '../functions/providers/ColorContext';
import generalStyles from '../styles/generalStyles';

const Stack = createStackNavigator();

const Main = () => {
    const { color } = useContext(ColorContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                screenOptions={{
                    gestureEnabled: false
                }}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignInStack"
                component={SignInStack}
                screenOptions={{
                    gestureEnabled: false,
                    headerShown: false
                }}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
                screenOptions={{
                    gestureEnabled: false,
                    headerTransparent: true
                }}
                options={({ route, navigation }) => {
                    const title = getFocusedRouteNameFromRoute(route);
                    return {
                        title:
                            title === 'HomeStack' || title === 'Recent'
                                ? 'Journals'
                                : title,
                        headerStyle: [
                            {
                                backgroundColor: color.primary,
                                height: 100,
                                borderBottomWidth: 0,
                                shadowColor: 'transparent'
                            },
                            title === 'Moods' || title === 'Profile'
                                ? {
                                      ...generalStyles.shadow,
                                      shadowColor: color.shadow
                                  }
                                : {}
                        ],
                        headerTitleStyle: {
                            marginLeft: 20,
                            fontSize: 32,
                            fontFamily: 'regular',
                            color: color.primaryText
                        },
                        headerTitleAlign: 'left',
                        headerLeft: () => null,
                        headerShown: showNav(navigation)
                    };
                }}
            />
        </Stack.Navigator>
    );
};

export default Main;
