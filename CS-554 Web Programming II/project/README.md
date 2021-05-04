# Project Name: Spotify Twitter 

# JavaScripters

- Hayden Daly
- Syed Mahvish
- Kyle Gensheimer
- Xianqing Zou
- Priya Gupta

## Github link : https://github.com/haydendaly/cs554-music-platform 

## Summary: 

Spotify Twitter is one stop for all music lovers. Just at one click listen and tweet your most loved song with your loved ones. 

It provides amazing features to listen song and tweet at same time using one platform. Our project integrated one of the leading music app Spotify. So, just login with Spotify account and enjoy music while sharing with others. 

We took care of one’s music taste and provided feature where you can see recommendation. 

Also, no need to login into Spotify account to get playlist, because in Spotify Twitter we populated that too.  

## Requirements: 

Docker Desktop https://www.docker.com/products/docker-desktop 

Supported Browser: Chrome, Firefox, Safari 

## Installation and Running: 

`docker-compose build --no-cache` 

`docker-compose up` 

To use the application, you need to have a Spotify account, if you don’t have one, you can create one or we could provide a login for you. 

(Will share Spotify account credential at email phill@stevens.edu) 

If you are unable to run the application, we also have an EC2 deployment live at http://13.58.15.179/ 

## Description: 

### Course Technologies: 

#### React: 

React will be used as our front-end framework to create a single page application and components that will be used on each page. 

Home Page, Music, Search, Sign In, Sign Up, Sign Out and complete frontend UI are implemented using React hook. 

#### Firebase Auth: 

Allow users to sign in via email/password, as well as Google or Facebook. 

Sign-In, Sign-up and password changing are implemented and handled using firebase authentication. It also allows the user to login using social platforms like Google and Facebook.  

User login is verified using firebase authentication. Error handling is done to allow only authenticated user into system. 

#### Redis: 

Redis is used to cache as data provided from the Spotify API to reduce API calls and loading times on the website. 

Cached data includes: Artists, Albums, Tracks, and Search queries.  

Data such as playlist info is not cached since playlists are constantly updated by users and those changes should be reflected on the website. 

#### MongoDB: 

MongoDB is used for database purpose. We stored all tweets (posts) into mongoDB along with user’s information.  

The schema is implemented in simple manner. Each object holds information about user(name, profile picture), tweets , liked tweets and comments. 

Used timestamp to display recent tweets and comments at top. 

#### Express: 

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web applications. Used Node.js to route data and communicate between backend and frontend. With a myriad of HTTP utility methods and middleware, created a robust API. 

### Independent Technologies: 

#### Spotify API: 

This project integrated Spotify API to use Spotify song data. The Spotify API are accessed using access token. Taken care of refreshing Access token periodically. 

The Spotify API are used to get data such as album, artist, playlist and tracks. It is also used to perform search queries. 

User recommended songs are also populated using API. 

#### AWS EC2/ECS: 

Used a standard ECS or EC2, general-purpose instance which will allow to deploy our application. 

#### Docker: 

This will provide a containerization for the deployment environment along us to dev in the same environment the project will be hosted on 

 

 
