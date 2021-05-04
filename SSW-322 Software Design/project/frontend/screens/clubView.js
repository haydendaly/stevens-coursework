/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeleine, Miriam, and Scott
#################################################*/

import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    Image,
    FlatList,
    KeyboardAvoidingView
} from "react-native"
import { get, updateProgress } from "../functions/clubs"
import { Global } from "../styles/Global"

function ClubView(props) {
    const club = props.navigation.state.params[0]
    const currentUserProgress = props.navigation.state.params[4]
    const friends = props.navigation.state.params[2]
    const book = props.navigation.state.params[1]
    const pageTotal = book.pages
    const userID = props.navigation.state.params[3]

    const [pageProgress, setPageProgress] = useState(currentUserProgress)
    // update(club.clubID, {
    //     users: {
    //         userID: userID,
    //         progress: pageProgress,
    //     },
    // })
    function updateProgressCallback(e) {
        // update(club.clubID, {}, (cb) => console.log("normal update cb", cb))
    }
    useEffect(() => {
        updateProgress(
            club.clubID,
            userID,
            pageProgress,
            updateProgressCallback
        )
    }, [pageProgress])

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">


            <Text style={[Global.header,{fontSize: 30, marginTop: 20, fontWeight: "600"}]}>Club Status</Text>

            <Image
                source={{
                    uri: book.imgURL,
                }}
                style={styles.bookCover}
            ></Image>


        <View style={styles.box}>
         <Text style={styles.bookTitle}>Your progress</Text>


            <View style={styles.pageCountContainer}>
                <Text style={[styles.pageCountTotal, {left: -78}]}>0 pages</Text>
                <Text style={styles.pageCountTotal}>  {pageTotal}</Text>
                <Text style = {[styles.pageCountTotal,{fontSize: 20}]}> pages</Text>
            </View>
        

            <View style={styles.progressBarContainer}>
                <View
                    style={{ ...styles.progressBarOutline, height: 30, borderColor: 'indigo' }}
                ></View>
                <View
                    style={{
                        ...styles.progressBarProgress,
                        width: `${(pageProgress / pageTotal) * 100}%`,
                        height: 30,
                        backgroundColor: 'indigo'
                    }}
                ></View>
            </View>

        <View style = {{flexDirection: "row", alignItems: "center"}}>
            <Text style={styles.text}>You have read</Text>

                
                <TextInput
                   // keyboardType={"phone-pad"}
                    placeholder="0"
                    placeholderTextColor= "grey"
                    style={styles.pageCountInput}
                    value={"" + pageProgress}
                    onChangeText={(progress) => setPageProgress(progress)}
                ></TextInput>
                

                <Text style={[styles.text,{marginRight: 10}]}>pages.</Text>
                
                <Text style={styles.text}>
                {
                    encouragements[
                        Math.floor(Math.random() * encouragements.length)
                    ]
                }
            </Text>
            </View>
            </View>


        <View style = {styles.box}>
            <Text style={[styles.bookTitle, {color:"#23827b"}]}>Your friends</Text>


            <View style={styles.friendContainer}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: friends.length > 1 ? 1 / friends.length : 1,
                    }}
                    data={friends}
                    renderItem={({ item }) => (
                        <View style={styles.friend}>
                            <Text style={styles.friendName}>{item.name}</Text>

                            <View style={styles.progressBarContainer}>
                                <View
                                    style={{
                                        ...styles.progressBarOutline,
                                        height: 10,
                                    }}
                                ></View>
                                <View
                                    style={{
                                        ...styles.progressBarProgress,
                                        width: `${
                                            (item.progress /
                                                styles.pageCountTotal) *
                                            100
                                        }%`,
                                        height: 10,
                                    }}
                                ></View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => "key" + index}
                />
            </View>
            </View>
    </KeyboardAvoidingView>
    )
}

const themeColor = "indigo"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        alignItems: "center",
    },
    bookTitle: {
        fontSize: 24,
       fontWeight: "bold",
        color: 'indigo',
        right: 99,
        marginTop: 8
    },
    bookAuthor: {
        fontSize: 16,
    },
    text: {
        fontSize: 20,
      //  marginBottom: 20,
        color: themeColor,
        textAlign: "center"
    },
    bookCover: {
        width: "40%",
        height: "30%",
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 10
    },
    progressBarContainer: {
        width: "80%",
        marginTop: 3,
        marginBottom: 10,
       // margin: 10
    },
    progressBarOutline: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#23827b",
        borderRadius: 50,
        width: "100%",
    },
    progressBarProgress: {
        backgroundColor: "#23827b",
        borderRadius: 50,
        position: "absolute",
    },
    pageCountContainer: {
        flexDirection: "row",
        alignItems: "center", 
        marginTop: 17
    },
    pageCountInput: {
       // backgroundColor: "white",
        fontSize: 25,
        textDecorationLine: "underline",
      //  borderColor: themeColor,
     //   borderWidth: 2,
       // borderRadius: 8,
      //  padding: 5,
        color: themeColor,
        marginLeft: 10,
        marginRight: 10
    },
    pageCountTotal: {
        fontSize: 20,
       // margin: 5,
        color: themeColor,
        left: 77
    },
    connectorBall: {
        width: 10,
        height: 10,
        borderColor: themeColor,
        borderWidth: 2,
        borderRadius: 50,
    },
    connectorBar: {
        width: 2,
        height: 50,
        backgroundColor: themeColor,
    },
    friendContainer: {
        width: "100%",
    },
    friend: {
        width: "100%",
        alignItems: "center",
    },
    friendName: {
        color: '#23827b',
        fontWeight: "bold",
        fontSize: 22
    },
    box: {
        alignItems: "center",
        width: "80%",
        width: 350,
        marginTop: 10,
        marginBottom: 10,
       // borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .3,
        shadowRadius: 1,  
        backgroundColor: 'white',
    }
   
})

const encouragements = [
    "Good work!",
    "Keep going!",
    "Nice work!",
    "Nice job!",
    "Hang in there!",
]
export default ClubView
