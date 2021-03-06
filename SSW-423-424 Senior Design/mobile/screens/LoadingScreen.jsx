import React, { useEffect, useContext } from 'react';
import { View, Text, LogBox, Keyboard, AsyncStorage } from 'react-native';

import { ColorContext } from '../functions/providers/ColorContext';

const LoadingScreen = (props) => {
    const { navigation } = props;
    const { color } = useContext(ColorContext);

    const checkIfLoggedIn = () => {
        Keyboard.dismiss();
        AsyncStorage.getItem('userID', (err, id) => {
            if (id !== null && id !== '') {
                navigation.navigate('HomeStack', { screen: 'Recent' });
            } else {
                navigation.navigate('SignInStack', { screen: 'Intro' });
            }
        });
    };

    useEffect(() => {
        LogBox.ignoreLogs(['Warning: ...']);
        LogBox.ignoreAllLogs(true);
        checkIfLoggedIn();
    }, [props]);

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color.primary,
                flex: 1
            }}
        >
            <Text
                style={{
                    fontFamily: 'bold',
                    fontSize: 28,
                    color: color.primaryText
                }}
            >
                Loading...
            </Text>
        </View>
    );
};

export default LoadingScreen;
