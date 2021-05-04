/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeleine, Miriam, and Scott
#################################################*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { useScreens } from 'react-native-screens';
import books from "../functions/books";
import users from "../functions/users";

export default class LoadingScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    AsyncStorage.getItem('userID').then((value) => {
      if (value != null && value != '') {
        users.doesExist(value, bool => {
          if (bool) {
            books.getHomescreen(books => {
              users.getClubs('temp', true, clubs => {
                this.props.navigation.navigate('HomeStack', {
                  books: books,
                  clubs: clubs,
                  userID: value
                });
              })
            })
          } else {
            this.props.navigation.navigate('SignInStack');
          }
        })
      } else {
        setTimeout( () => {
          this.props.navigation.navigate('SignInStack');
        }, 300)
      }
    })
  };

  render() {
    return <View style={styles.container}>
      <Text style={{fontSize: 64, color: '#fff'}}>Atticus</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d95d1'
  }
});
