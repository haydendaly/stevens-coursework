/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

module.exports = {
    get: function(bookID, callback) {
          fetch('https://bookclub-hd.herokuapp.com/books/get/' + bookID, {
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
    doesExist: function(bookID, callback) {
        fetch('https://bookclub-hd.herokuapp.com/books/doesExist' + bookID, {
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
    create: function(bookID, callback) {
        fetch('https://bookclub-hd.herokuapp.com/books/create/' + bookID, {
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
    search: function(search, callback) {
        fetch('https://bookclub-hd.herokuapp.com/books/search/' + search, {
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
    getHomescreen: function(callback) {
        fetch('https://bookclub-hd.herokuapp.com/books/getHomescreen', {
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
    }
}
