const dbConnection = require("./config/connection");
const data = require("./data");
const userData = data.users;
const postData = data.post;
const path = require('path');
const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    let userPhotoDir = path.join(__dirname, '.', 'seedPhotos')

    const user1 = {
      id: "GwczNGcQ7qbciQRKC1EFmCIKmP22",
      displayName: "Miranda Zou",
      email: "xzou3@stevens.edu"
    };

    const miranda = await userData.createUser(user1);
    const mirandaPhoto = {
      data: await fs.readFileAsync(path.join(userPhotoDir, 'miranda.jpg')),
      type: 'image/jpeg'
    }

    await userData.updateUser(miranda._id, { photoData: mirandaPhoto });

    const user2 = {
      id: "ld8SZZOXptQU8FM3EpRFQraf9M42",
      displayName: "Mahvish Syed",
      email: "msyed6@stevens.edu"
    };

    const mahvish = await userData.createUser(user2);


    const user3 = {
      id: "J0MCtGX1bjbKfXmzTtmbMc0wq5Q2",
      displayName: "Priya Gupta",
      email: "pgupta14@stevens.edu"
    };

    const priya = await userData.createUser(user3);

    const user4 = {
      id: "MYhph0DqDPVQMNl5itMpBPtROin2",
      displayName: "Hayden Daly",
      email: "hdaly1@stevens.edu"
    };

    const hayden = await userData.createUser(user4);

    const user5 = {
      id: "GS4WlRECQCbnTAp126LFRFxyfSG3",
      displayName: "Kyle Gensheimer",
      email: "kylegensheimer@gmail.com"
    };

    const kyle = await userData.createUser(user5);
    const kylePhoto = {
      data: await fs.readFileAsync(path.join(userPhotoDir, 'kyle.jpg')),
      type: 'image/jpeg'
    }

    await userData.updateUser(kyle._id, { photoData: kylePhoto });

    const user6 = {
      id: "ubuNwizjtegQ2Pm7e5L1JZ2nXNm2",
      displayName: "Trey",
      email: "kgenshei@stevens.edu",
    }

    const trey = await userData.createUser(user6);
    const treyPhoto = {
      data: await fs.readFileAsync(path.join(userPhotoDir, 'trey.jpg')),
      type: 'image/jpeg'
    }
    await userData.updateUser(trey._id, { photoData: treyPhoto });

    const user7 = {
      id: '123abc',
      displayName: "Thundercat",
      email: "example@website.com"
    }

    const thundercat = await userData.createUser(user7);
    const thundercatPhoto = {
      data: await fs.readFileAsync(path.join(userPhotoDir, 'Thundercat.jpg')),
      type: 'image/jpeg'
    }
    await userData.updateUser(thundercat._id, { photoData: thundercatPhoto });


    //------- Creating Posts ------------

    const kylePost1 = {
      userId: kyle._id,
      text: "This is the best Pink Floyd song. Any other opinion is wrong!",
      commentsArray: [{
        _id: "342ba440-40ac-11eb-b521-7f5557663771",
        userId: "ubuNwizjtegQ2Pm7e5L1JZ2nXNm2",
        commentText: "how about Shine On You Crazy Diamond???",
        displayName: "Trey",
        timeStamp: "Thu, 17 Dec 2020 25:09:51 GMT"
      },
      {
        _id: "342ba440-40ac-11eb-b521-7f5557663722",
        userId: "GS4WlRECQCbnTAp126LFRFxyfSG3",
        commentText: "thats either my second or third fave",
        displayName: "Kyle Gensheimer",
        timeStamp: "Thu, 17 Dec 2020 25:13:33 GMT"
      }],
      likesArray: [{
        _id: "1f1f4e30-40ac-11eb-b521-7f5557663771",
        userId: "ubuNwizjtegQ2Pm7e5L1JZ2nXNm2"
      }],
      songData: {
        album: {
          album_type: "album",
          artists: [{
            external_urls: {
              spotify: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9"
            },
            href: "https://api.spotify.com/v1/artists/0k17h0D3J5VfsdmQ1iZtE9",
            id: "0k17h0D3J5VfsdmQ1iZtE9",
            name: "Pink Floyd",
            type: "artist",
            uri: "spotify:artist:0k17h0D3J5VfsdmQ1iZtE9"
          }],
          external_urls: {
            spotify: "https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv"
          },
          href: "https://api.spotify.com/v1/albums/4LH4d3cOWNNsVw41Gqt2kv",
          id: "4LH4d3cOWNNsVw41Gqt2kv",
          images: [{
            height: 640,
            url: "https://i.scdn.co/image/ab67616d0000b273f05e5ac32fdd79d100315a20",
            width: 640
          }, {
            height: 300,
            url: "https://i.scdn.co/image/ab67616d00001e02f05e5ac32fdd79d100315a20",
            width: 300
          }, {
            height: 64,
            url: "https://i.scdn.co/image/ab67616d00004851f05e5ac32fdd79d100315a20",
            width: 64
          }],
          name: "The Dark Side of the Moon",
          release_date: "1973-03-01",
          release_date_precision: "day",
          total_tracks: 10,
          type: "album",
          uri: "spotify:album:4LH4d3cOWNNsVw41Gqt2kv"
        },
        artists: [{
          external_urls: {
            spotify: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9"
          },
          href: "https://api.spotify.com/v1/artists/0k17h0D3J5VfsdmQ1iZtE9",
          id: "0k17h0D3J5VfsdmQ1iZtE9",
          name: "Pink Floyd",
          type: "artist",
          uri: "spotify:artist:0k17h0D3J5VfsdmQ1iZtE9"
        }],
        disc_number: 1,
        duration_ms: 169534,
        explicit: false,
        external_ids: {
          isrc: "GBN9Y1100077"
        },
        external_urls: {
          spotify: "https://open.spotify.com/track/2ctvdKmETyOzPb2GiJJT53"
        },
        href: "https://api.spotify.com/v1/tracks/2ctvdKmETyOzPb2GiJJT53",
        id: "2ctvdKmETyOzPb2GiJJT53",
        is_local: false,
        is_playable: true,
        name: "Breathe (In the Air)",
        popularity: 69,
        preview_url: "https://p.scdn.co/mp3-preview/3453f7f075272cbb77f09ba0e50914b55c07cedc?cid=d1f357b5e08e444682e89704869b769c",
        track_number: 2,
        type: "track",
        uri: "spotify:track:2ctvdKmETyOzPb2GiJJT53"
      },
    }
    await postData.createPost(kylePost1)


    //---------
    const thundercatPost1 = {
      userId: thundercat._id,
      text: "Check out this song I made!",
      commentsArray: [{
        _id: "342ba440-40ac-11eb-b521-7f5557663772",
        userId: "MYhph0DqDPVQMNl5itMpBPtROin2",
        commentText: "nice!",
        displayName: "Hayden Daly",
        timeStamp: "Thu, 17 Dec 2020 21:41:51 GMT"
      }],
      likesArray: [{
        _id: "1f1f4e30-40ac-11eb-b521-7f5557663771",
        userId: "ubuNwizjtegQ2Pm7e5L1JZ2nXNm2"
      },
      {
        _id: 'sampleid',
        userId: 'GS4WlRECQCbnTAp126LFRFxyfSG3'
      }],
      songData: {
        album: {
          album_type: "album",
          artists: [{
            external_urls: {
              spotify: "https://open.spotify.com/artist/4frXpPxQQZwbCu3eTGnZEw"
            },
            href: "https://api.spotify.com/v1/artists/4frXpPxQQZwbCu3eTGnZEw",
            id: "4frXpPxQQZwbCu3eTGnZEw",
            name: "Thundercat",
            type: "artist",
            uri: "spotify:artist:4frXpPxQQZwbCu3eTGnZEw"
          }],
          external_urls: {
            spotify: "https://open.spotify.com/album/7vHBQDqwzB7uDvoE5bncMM"
          },
          href: "https://api.spotify.com/v1/albums/7vHBQDqwzB7uDvoE5bncMM",
          id: "7vHBQDqwzB7uDvoE5bncMM",
          images: [{
            height: 640,
            url: "https://i.scdn.co/image/ab67616d0000b27385c5e6c686ced3e43bae2748",
            width: 640
          }, {
            height: 300,
            url: "https://i.scdn.co/image/ab67616d00001e0285c5e6c686ced3e43bae2748",
            width: 300
          }, {
            height: 64,
            url: "https://i.scdn.co/image/ab67616d0000485185c5e6c686ced3e43bae2748",
            width: 64
          }],
          name: "Drunk",
          release_date: "2017-02-24",
          release_date_precision: "day",
          total_tracks: 23,
          type: "album",
          uri: "spotify:album:7vHBQDqwzB7uDvoE5bncMM"
        },
        artists: [{
          external_urls: {
            spotify: "https://open.spotify.com/artist/4frXpPxQQZwbCu3eTGnZEw"
          },
          href: "https://api.spotify.com/v1/artists/4frXpPxQQZwbCu3eTGnZEw",
          id: "4frXpPxQQZwbCu3eTGnZEw",
          name: "Thundercat",
          type: "artist",
          uri: "spotify:artist:4frXpPxQQZwbCu3eTGnZEw"
        }],
        disc_number: 1,
        duration_ms: 188453,
        explicit: false,
        external_ids: {
          isrc: "US25X1090547"
        },
        external_urls: {
          spotify: "https://open.spotify.com/track/7CH99b2i1TXS5P8UUyWtnM"
        },
        href: "https://api.spotify.com/v1/tracks/7CH99b2i1TXS5P8UUyWtnM",
        id: "7CH99b2i1TXS5P8UUyWtnM",
        is_local: false,
        is_playable: true,
        name: "Them Changes",
        popularity: 73,
        preview_url: "https://p.scdn.co/mp3-preview/01889205bf7803a1c5d9b05adb5b605a8e306ad9?cid=d1f357b5e08e444682e89704869b769c",
        track_number: 15,
        type: "track",
        uri: "spotify:track:7CH99b2i1TXS5P8UUyWtnM"
      }
    }

    await postData.createPost(thundercatPost1)

    //-----
    const kylePost2 = {
      userId: kyle._id,
      text: "if anyone wants to check it out, this playlist is pretty much everything i listen to",
      commentsArray: [],
      likesArray: [{
        _id: "1f1f4e30-40ac-11eb-b521-7f5557663771",
        userId: "ubuNwizjtegQ2Pm7e5L1JZ2nXNm2"
      }],
      songData: {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/4E1oDZ0GGbGOPwKrpLLWWt"
        },
        "href": "https://api.spotify.com/v1/playlists/4E1oDZ0GGbGOPwKrpLLWWt",
        "id": "4E1oDZ0GGbGOPwKrpLLWWt",
        "images": [{
          "height": null,
          "url": "https://i.scdn.co/image/ab67706c0000bebbe0b165e11ed43cae4ccd8fd3",
          "width": null
        }],
        "name": "im just going to throw everything into here, i give up on playlists",
        "owner": {
          "display_name": "Kyle Gensheimer",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/boam123"
          },
          "href": "https://api.spotify.com/v1/users/boam123",
          "id": "boam123",
          "type": "user",
          "uri": "spotify:user:boam123"
        },
        "primary_color": null,
        "public": null,
        "snapshot_id": "MjU1LDRlMjkxMjc5OWM5NTE2Mzg0MTc2ZTE4YTg0YzQ5NDhkN2VmZjBlZDE=",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/4E1oDZ0GGbGOPwKrpLLWWt/tracks",
          "total": 213
        },
        "type": "playlist",
        "uri": "spotify:playlist:4E1oDZ0GGbGOPwKrpLLWWt"
      },
    }
    await postData.createPost(kylePost2)

    //----

    const mirandaPost1 = {
      userId: miranda._id,
      text: "anybody have any song reccomendations?",
      commentsArray: [{
        _id: "d6c12d40-40b3-11eb-b521-7f5557663771",
        userId: "GS4WlRECQCbnTAp126LFRFxyfSG3",
        commentText: "i always look at my discover weekly playlist for some new good stuff, check it out!",
        displayName: "Kyle Gensheimer",
        timeStamp: "Thu, 17 Dec 2020 22:04:31 GMT"
      }],
      likesArray: [],
    }

    await postData.createPost(mirandaPost1);




    console.log("Done seeding database");
    await db.serverConfig.close();

  } catch (e) {
    console.log(e);
  }
};

main().catch(console.log);
