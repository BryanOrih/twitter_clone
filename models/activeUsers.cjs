const mongoose = require('mongoose')
const {connectDBs} = require('../config/database.cjs')

const ActiveUserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true}
    },
    {timestamps: true}
);

const { userDB } = connectDBs()

module.exports = { 
    ActiveUser: userDB.model('Activeuser', ActiveUserSchema),
}