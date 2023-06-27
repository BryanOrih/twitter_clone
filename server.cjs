/* eslint-disable no-undef */
let cors = require("cors");
const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
const port = 4002

const { createTweet, getTweets, updateTweet, deleteTweet } = require('./controllers/tweets.cjs')
const {getUser, createUser} = require('./controllers/activeUsers.cjs')

const app = express();
app.use(cors());
app.use(express.json());

// CRUD - Create, Read, Update, Delete

// C
app.post('/tweets', createTweet)
app.post('/users/create', createUser)

// R
app.get('/tweets', getTweets)
app.get('/users/:email', getUser)

// U send ID in params. Send update stuff in req.body
app.put('/tweets/:tweetId/:newTitle', updateTweet)

// D
app.delete('/tweets/:tweetId', deleteTweet)


app.listen(port, () => {
    console.log("listening on 4002")

})
