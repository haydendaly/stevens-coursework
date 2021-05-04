import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetStarted from '../screens/getStarted';
import PhoneInput from '../screens/phoneInput';
import TextVerification from '../screens/textVerification';
import NameInput from '../screens/nameInput';
import { Global } from '../styles/Global';

const screens = {
  GetStarted: {
    screen: GetStarted,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
  PhoneInput: {
    screen: PhoneInput,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Phone Number',
        headerStyle: Global.headerStyle,
        headerTitleStyle: Global.headerTitleStyle,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} style={{paddingLeft: 8}}>
            <Icon
              name='chevron-left'
              color='#FFF'
              size={32}
            />
          </TouchableOpacity>
        ),
      }
    }
  },
  TextVerification: {
    screen: TextVerification,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Verification',
        headerStyle: Global.headerStyle,
        headerTitleStyle: Global.headerTitleStyle,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('PhoneInput')} style={{paddingLeft: 8}}>
            <Icon
              name='chevron-left'
              color='#FFF'
              size={32}
            />
          </TouchableOpacity>
          ),
      }
    }
  },
  NameInput: {
    screen: NameInput,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Name Input',
        headerStyle: Global.headerStyle,
        headerTitleStyle: Global.headerTitleStyle,
        gestureEnabled: false,
        headerLeft: () => (
          null
        )
      }
    }
  }
};

const SignInStack = createStackNavigator(screens);

export default createAppContainer(SignInStack);
