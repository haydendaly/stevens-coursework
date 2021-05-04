/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeleine, Miriam, and Scott
#################################################*/

import React from "react"
import books from "../functions/books";
import users from '../functions/users';
import clubs from "../functions/clubs";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  BackHandler
} from "react-native"
import { Global } from '../styles/Global';

function ClubContainer({ clubsArray, userID, navigation }) {
  if (clubsArray.length == 0) {
    return (
      <View>
        <View style={{paddingLeft: Dimensions.get("screen").width * 0.03, paddingTop: 10 }}>
          <View style={[Global.clubHolder, {width: Dimensions.get("screen").width * 0.94, flexDirection: 'column' }]}>
            <Text style={[Global.clubTitle, {paddingLeft: 10, fontSize: 24, fontWeight: '400', color: '#eee'}]}>Welcome to Atticus! Our mission is to simplify reading in groups. To get started, join or create a club.</Text>
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity
               style={[Global.doneButton, {bottom: 10}]}
               activeOpacity={0.75}
               onPress={() => {
                 navigation.navigate('CreateView');
               }}
                >
               <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: '600'}}>Join / Create A Club</Text>
             </TouchableOpacity>
             </View>
          </View>
        </View>
      </View>
    )
  } else if (clubsArray.length == 1) {
    return (
      <View>
        <Text style={Global.clubText}>Your Club</Text>
        <View style={{paddingLeft: Dimensions.get("screen").width * 0.03 }}>
          <View style={[Global.clubHolder, {width: Dimensions.get("screen").width * 0.94 }]}>
            <TouchableOpacity
              style={Global.clubImage}
              onPress={() => {
                clubs.get(clubsArray[0].clubID, (club) => {
                  books.get(club.bookID, (book) => {
                    var friends = [];
                    var currentProgress = 0;
                    for (var i = 0; i < club.users.length; i++) {
                      if (club.users[i].userID != userID) {
                        friends.push(club.users[i])
                      } else {
                        currentProgress = club.users[i].progress
                      }
                    }
                    navigation.navigate("ClubView", [club, book, friends, userID, currentProgress])
                  })
                })
              }}
            >
              <Image
                source={{ uri: clubsArray[0].imgURL }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
              ></Image>
            </TouchableOpacity>
            <View style={{width: Dimensions.get("screen").width * 0.94 - 120}}>
              <Text style={Global.clubTitle}>{clubsArray[0].title}</Text>
              <Text style={Global.clubAuthor}>By {clubsArray[0].author}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  } else {
    return (
    <View>
      <Text style={Global.clubText}>Your Clubs</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={clubsArray}
        renderItem={({ item }) => (
          <View style={{paddingLeft: Dimensions.get("screen").width * 0.025 }}>
            <View style={[Global.clubHolder, {width: Dimensions.get("screen").width * 0.9 }]}>
              <TouchableOpacity
                style={Global.clubImage}
                onPress={() => {
                  clubs.get(item.clubID, (club) => {
                    books.get(club.bookID, (book) => {
                      var friends = [];
                      var currentProgress = 0;
                      for (var i = 0; i < club.users.length; i++) {
                        if (club.users[i].userID != userID) {
                          friends.push(club.users[i])
                        } else {
                          currentProgress = club.users[i].progress
                        }
                      }
                      navigation.navigate("ClubView", [club, book, friends, userID, currentProgress])
                    })
                  })
                }}
              >
                <Image
                  source={{ uri: item.imgURL }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                ></Image>
              </TouchableOpacity>
              <View style={{width: Dimensions.get("screen").width * 0.9 - 120}}>
                <Text style={Global.clubTitle}>{item.title}</Text>
                <Text style={Global.clubAuthor}>By {item.author}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.bookID}
      />
    </View>
  )
  }
}

export default class GetStarted extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.navigation.state.params
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        users.getClubs(this.state.userID, true, clubs => {
          this.setState({
            clubs: clubs
          })
        })
      }
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.willFocusSubscription.remove();
  }

  handleBackButton() {
      return true;
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ClubContainer clubsArray={this.state.clubs} userID={this.state.userID} navigation={this.props.navigation}/>
        <FlatList
          data={this.state.books}
          renderItem={({ item }) => (
            <View>
              <Text style={Global.bookText}>{item.title}</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={item.data}
                renderItem={({ item }) => (
                  <View style={{ paddingLeft: 10 }}>
                    <TouchableOpacity
                      style={Global.book}
                      onPress={() => {
                        books.get(item.bookID, (data) => {
                          this.props.navigation.navigate("BookView", data)
                        })
                      }}
                    >
                      <Image
                        source={{ uri: item.imgURL }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 8
                        }}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.bookID}
              />
            </View>
          )}
          keyExtractor={item => item.title}
        />
      </ScrollView>
    )
  }
}
