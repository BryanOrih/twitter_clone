
const mongoose = require('mongoose');

const connectDBs = () => {
    try {
        const TweetDb = mongoose.createConnection(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        const userDB = mongoose.createConnection(process.env.MONGO_URL_ACTIVE_USERS, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        return { TweetDb, userDB }
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectDBs }