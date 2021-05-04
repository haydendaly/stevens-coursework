/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

module.exports = {
    get: function(userID, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/get/' + userID, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback([]);
        })
    },
    create: function(name, number, userID, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/create', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: name,
                number: number,
                userID: userID
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback(null);
        })
    },
    update: function(userID, body, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/update/' + userID, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: body
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback(null);
        })
    },
    doesExist: function(userID, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/doesExist/' + userID, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback([]);
        })
    },
    delete: function(userID, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/delete/' + userID, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback([]);
        })
    },
    getClubs: function(userID, homescreen, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/getClubs/' + userID + '?homescreen=' + homescreen, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback([]);
        })
    },
    updateToken: function(userID, newToken, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/updateToken' + userID + "/" + newToken, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback([]);
        })
    },
    phoneAuth: function(number, callback) {
        fetch('https://bookclub-hd.herokuapp.com/users/phoneAuth/' + number + "/", {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            callback([]);
        })
    },
}
