import React, { useState, useEffect } from 'react';
import { TextInput, Text, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { decode, encode } from 'base-64';
import 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-view';

import MainStack from './stacks/Main';
import { User } from './functions/providers/UserContext';
import { Color } from './functions/providers/ColorContext';
import { Awards } from './functions/providers/AwardContext';
// const { mp } = require("./functions/util/mixpanel");

const globalAny = global;

if (!globalAny.btoa) {
    globalAny.btoa = encode;
}

if (!globalAny.atob) {
    globalAny.atob = decode;
}

const App = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);

        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
        Text.defaultProps.fontFamily = 'regular';
        TextInput.defaultProps = TextInput.defaultProps || {};
        TextInput.defaultProps.allowFontScaling = false;
        // AsyncStorage.setItem("userID", "BCRMMati2vuQ3Mlfq01m")
    }, []);

    const loadFonts = () => {
        setFontsLoaded(true);
    };

    const getFontsAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                regular: require('./assets/fonts/Apercu-Regular.otf'),
                medium: require('./assets/fonts/Apercu-Medium.otf'),
                bold: require('./assets/fonts/Apercu-Bold.otf'),
                mono: require('./assets/fonts/Apercu-Mono.otf')
            })
        ]);
    };

    if (fontsLoaded) {
        return (
            <User>
                <Color>
                    <Awards>
                        <NavigationContainer>
                            <MainStack />
                        </NavigationContainer>
                    </Awards>
                </Color>
            </User>
        );
    } else {
        return (
            <SafeAreaProvider>
                <AppLoading startAsync={getFontsAsync} onFinish={loadFonts} />
            </SafeAreaProvider>
        );
    }
};

export default App;
