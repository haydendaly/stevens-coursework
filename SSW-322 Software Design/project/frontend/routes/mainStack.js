import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { setCustomText } from 'react-native-global-props'
import SignInStack from './signInStack';
import HomeStack from './homeStack';
import LoadingScreen from '../screens/loadingScreen';

setCustomText({
  style: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    fontSize: 14
  }
}) 

const screens = {
  LoadingScreen: {
    screen: LoadingScreen,
    navigationOptions: () => {
      return {
        headerShown: false,
        gestureEnabled: false,
      };
    }
  },
  SignInStack: {
    screen: SignInStack,
    navigationOptions: () => {
      return {
        headerShown: false,
        gestureEnabled: false,
      };
    }
  },
  HomeStack: {
    screen: HomeStack,
    navigationOptions: () => {
      return {
        headerShown: false,
        gestureEnabled: false,
      };
    }
  }
};

const MainStack = createStackNavigator(screens, {
    initialRouteName: 'LoadingScreen',
    defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid
  }
});

export default createAppContainer(MainStack);
