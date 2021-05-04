/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

import { AsyncStorage } from 'react-native';

module.exports = {
    create: function (bookID, userID, callback) {
      AsyncStorage.getItem('name').then((value) => {
        fetch("https://bookclub-hd.herokuapp.com/clubs/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookID: bookID,
                userID: userID,
                name: value
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson)
        })
        .catch((error) => {
            console.log(JSON.stringify(error))
            callback(null)
        })
      })
    },
    get: function (clubID, callback) {
        fetch("https://bookclub-hd.herokuapp.com/clubs/get/" + clubID, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("response JSON:", responseJson)
                callback(responseJson)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                callback([])
            })
    },
    delete: function (clubID, callback) {
        fetch("https://bookclub-hd.herokuapp.com/clubs/delete/" + clubID, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                callback([])
            })
    },
    // update: function (clubID, body, callback) {
    //     fetch("https://bookclub-hd.herokuapp.com/clubs/update/" + clubID, {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         body: body,
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             callback(responseJson)
    //         })
    //         .catch((error) => {
    //             console.log(JSON.stringify(error))
    //             callback(null)
    //         })
    // },
    join: function (clubID, userID, callback) {
        fetch(
            "https://bookclub-hd.herokuapp.com/clubs/join/" +
                clubID +
                "/" +
                userID,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                callback([])
            })
    },
    leave: function (clubID, userID, callback) {
        fetch(
            "https://bookclub-hd.herokuapp.com/clubs/leave/" +
                clubID +
                "/" +
                userID,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                callback([])
            })
    },
    updateProgress: function (clubID, userID, progress, callback) {
        fetch(
            "https://bookclub-hd.herokuapp.com/clubs/updateProgress/" +
                clubID +
                "/" +
                userID +
                "/" +
                progress,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson)
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
                callback([])
            })
    },
}
