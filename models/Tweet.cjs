/* eslint-disable no-undef */
const mongoose = require('mongoose')
const {connectDBs} = require('../config/database.cjs')
const tweetSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        firstName: String,
        lastName: String,
        likes: { type: Number, default: 0 },
        sponsored: { type: Boolean, default: false },
    },
    {timestamps: true}
);

const { TweetDb } = connectDBs()

module.exports = {
    Tweet: TweetDb.model('Tweet', tweetSchema)
}