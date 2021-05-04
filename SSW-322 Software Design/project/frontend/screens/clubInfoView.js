/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeleine, Miriam, and Scott
#################################################*/

import React, { useState } from 'react';
import {
  Text, View, TextInput, StyleSheet, Clipboard, TouchableOpacity, AsyncStorage
} from 'react-native';
import { Global } from '../styles/Global';
import clubs from '../functions/clubs';

let MS_PER_DAY = 1000*60*60*24

function rateMessage(end_date, progress, book) {
	let pages_left = book.pages - progress
	let days_left = (end_date - Date.now()) / MS_PER_DAY
	let rate = Math.ceil(pages_left / days_left)
	if (rate > 0) {
		return "In order to finish by " + end_date.toDateString() + " you must read " + rate + (rate>1?" pages":" page") + " per day!"
	}
	else if (rate == 0) {
		return "You have completed reading this book!"
	}
	else {
		return "The target date for this club has already passed."
	}
}

export default class ClubInfoView extends React.Component {
  constructor(props) {
    super(props)
	this.state = {
		club: this.props.navigation.state.params.params[0],
		book: this.props.navigation.state.params.params[1],
		progress: this.props.navigation.state.params.params[4],
		end: new Date(this.props.navigation.state.params.params[0].end*1000)
	}
  }
  
  writeToClipboard = async () => {
    //To copy the text to clipboard
    await Clipboard.setString(this.state.club.clubID);
  };
  
  leaveClub = () => {
	AsyncStorage.getItem('userID').then(userID => {
	  clubs.leave(this.state.club.clubID, userID, data => {
		this.props.navigation.navigate('HomeScreen');
	  })
	})
  }
 
  render() {
    return (
      <View style={Global.container}>
	    <Text style={[Global.bookText, {marginTop:50, paddingLeft:0, textAlign:'center'}]}>{rateMessage(this.state.end, this.state.progress, this.state.book)}</Text>
	    <Text style={[Global.bookText, {marginTop:50, paddingLeft:0}]}>Invite Code</Text>
	    <TouchableOpacity onPress={this.writeToClipboard} style={Global.input}>
		  <View>
		    <Text style={{textAlign:"center", fontSize:24}}>{this.state.club.clubID}</Text>
		  </View>
	    </TouchableOpacity>
		<TouchableOpacity onPress={this.leaveClub}>
		  <View style={{marginTop:175}}>
		    <Text style={{color:'red', textDecorationLine:'underline', fontSize:24}}>Leave Club</Text>
          </View>
		</TouchableOpacity>
      </View>
    )
  }
}
