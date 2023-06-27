const { response } = require('express')
const {ActiveUser} = require('../models/activeUsers.cjs')
const bcrypt = require('bcrypt')

const getUser = async (req,res) =>{
    try{
        let emailName = req.params.email
        let user = await ActiveUser.findOne({email: emailName})
        console.log(user)
        if(user){
            res.json(user.email)
        }else{
            res.send("Email is Unique")
        }
    }catch(err){
        res.status(400).send(`error: ${err}`)
    }
}
const createUser = async (req, res) =>{
    try{
        let userData = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        userData.password = hashedPassword

        ActiveUser.create(userData)
        res.json("You have just made your account, welcome")
    }catch(err){
        res.status(400).send(`error: ${err}`)
    }
}
module.exports = {
    getUser,
    createUser
}