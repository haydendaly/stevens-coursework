/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeleine, Miriam, and Scott
#################################################*/

import React, { useState } from "react"
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    Image,
    Dimensions,
} from "react-native"
import books from "../functions/books"
import { Global } from "../styles/Global"

export default function ClubView({ navigation }) {
    const [value, changeText] = useState("")
    const [results, updateResults] = useState([])
    function onChangeText(text) {
        let result = changeText(text)
        text = text.split(" ").join("+")
        books.search(text, (books) => {
            if (books[0] == null) {
                updateResults([])
            } else {
                updateResults(books)
            }
        })
        return result
    }
  
    return (
        <View style={styles.container}>
            <Text
                style={[
                    Global.header,
                    {
                        marginTop: 50,
                        fontSize: 32,
                        fontWeight: "600",
                    },
                ]}
            >
                {" "}
                Browse for books{" "}
            </Text>

            <TextInput
                placeholder="Title, Author, ISBN, etc..."
                textAlign={"center"}
                autoFocus={true}
                style={styles.input}
                keyboardType={"default"}
                onChangeText={(text) => onChangeText(text)}
                value={value}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={results}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={styles.bookHolder}
                            onPress={() => {
                                books.get(item.bookID, (data) => {
                                    navigation.navigate("BookView", data)
                                })
                            }}
                        >
                            <Image
                                source={{ uri: item.imgURL }}
                                style={styles.bookImage}
                            ></Image>
                            <View style={styles.bookInfo}>
                                <Text style={styles.bookTitle}>
                                    {item.title.length <= 60
                                        ? item.title
                                        : item.title.slice(0, 60) + "..."}
                                </Text>
                                <Text style={styles.clubAuthor}>
                                    By {item.author}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => item.title + index}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        alignItems: "center",
    },
    text: {
        marginTop: 50,
        fontSize: 32,
    },
    input: {
        width: "80%",
        borderWidth: 2,
        borderColor: "#143e60",
        margin: 8,
        padding: 18,
        borderRadius: 8,
        fontSize: 23,
    },
    bookHolder: {
        width: Dimensions.get("screen").width * 0.9,
        height: 185,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bookImage: {
        width: 113.33,
        height: 165,
        borderRadius: 8,
        paddingLeft: 10,
        marginTop: 10,
    },
    bookInfo: {
        width: Dimensions.get("screen").width * 0.9 - 120,
    },
    bookTitle: {
        fontSize: 24,
        color: "#000",
        marginTop: 10,
    },
    bookAuthor: {
        justifyContent: "space-between",
        marginTop: 5,
        color: "#bbb",
    },
})
