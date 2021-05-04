/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeleine, Miriam, and Scott
#################################################*/

import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
  Linking
} from 'react-native';
import clubs from '../functions/clubs';
import books from '../functions/books'



export default class BookView extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.navigation.state.params
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#dac8e8', flex: .33, width: '100%', flexDirection: 'row'}}>
          <View style={{flex: .6, marginTop: '1.75%', height: '93%', paddingLeft: '3%'}}>
            <Image source={{uri: this.state.imgURL}} style={{borderRadius: 8, height: '100%', width: '100%'}}>
            </Image>

            </View>

          <View style={{flex: 1, height: "50%", flexDirection: "column"}}>
            <Text adjustsFontSizeToFit
              numberOfLines={2} style={styles.bookTitle}>{this.state.title}</Text>
            <Text style={styles.subHeader}>{this.state.author}</Text>

           <TouchableOpacity
              style={styles.button}
              activeOpacity={0.75}
              onPress={() => {
                AsyncStorage.getItem('userID').then(value => {
                clubs.create(this.state.bookID, value, (data) => {
                  clubs.get(data.clubID, (club) => {
                    books.get(club.bookID, (book) => {
                      var friends = [];
                      var currentProgress = 0;
                      for (var i = 0; i < club.users.length; i++) {
                        if (club.users[i].userID != value) {
                          friends.push(club.users[i])
                        } else {
                          currentProgress = club.users[i].progress
                        }
                      }
                      this.props.navigation.navigate("ClubView", [club, book, friends, value, currentProgress])
                    })
                  })
                 })
               })
              }}
               >
              <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Create a club</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.button}
               activeOpacity={0.75}
               onPress={() => {
                 Linking.canOpenURL(this.state.purchaseURL).then(supported => {
                  if (supported) {
                    Linking.openURL(this.state.purchaseURL);
                  } else {
                    console.log("Don't know how to open URI: " + this.state.purchaseURL);
                  }
                });
               }}
                >
               <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Get on Amazon</Text>
             </TouchableOpacity>
          </View>
       </View>

      <View style={{flex: .65, height: 180}} >
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style = {[styles.text, {fontWeight: "800"}]}>Description</Text>
          <Text style = {styles.text}>{this.state.description}</Text>
        </View>
        </ScrollView>
              </View>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    color: '#20639B',
    fontWeight: '600'
  },
  button: {
    backgroundColor: "indigo",
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: 'indigo',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  bookTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: 'black',
    paddingTop:10,
    paddingLeft:12,
  },
  subHeader: {
    fontSize: 18,
    color: 'indigo',
    paddingTop: '2%',
    fontWeight: '400',
    paddingLeft:12
  },
  textContainer: {
    flex: .3,
    padding: '6%',
    paddingTop: '0%'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  doneButton: {
    backgroundColor: '#20639B',
    width: '85%',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500'
  },
  input: {
    width: '60%',
    borderWidth: 2,
    borderColor: '#20639B',
    margin: 8,
    padding: 18,
    borderRadius: 8,
    fontSize: 24
  },
  text:{
    fontSize:22,
    marginTop: 10
  }
});
