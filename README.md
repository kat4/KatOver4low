[![Code Climate](https://codeclimate.com/github/kat4/KatOver4low/badges/gpa.svg)](https://codeclimate.com/github/kat4/KatOver4low)
[![Test Coverage](https://codeclimate.com/github/kat4/KatOver4low/badges/coverage.svg)](https://codeclimate.com/github/kat4/KatOver4low/coverage)

# KatOver4low
A question and answer website that has no likeness whatsoever to StackOverflow

Our aim is to create a website where, once logged in with github credentials people can post their questions and people can comment on those questions.

##How to use our site

In the smaller box, type your question title. In the larger box type the more details content of your questions.
Check it our here > https://katover4low.herokuapp.com/

We will be using:
* github authentication
* socket.io - for realtime interaction
* redis as a database

In order to create a realtime questions and answers web app you will need several components:

* A frontend  (html, javascript, and css) to take input form the users, send http requests to your server and display the questions and answers in the browser. 
* A server to handle the http requests from the clients/browsers. Your server should require in a JavaScript file that contains the methods you will use to manipulate the database. 
* 
