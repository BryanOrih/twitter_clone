import React, { useState, useEffect } from 'react'
import "./index.css"
import axios from 'axios'

const Signup = () => {
  const [error, setError] = useState({
    emailError: "",
    passwordError: ""
  })
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const isValidInput = (e) =>{
    let goodInput = true
    if(input.confirmPassword !== input.password){
      setError((prevError) => ({...prevError, passwordError: "Passwords don't match",}));
      goodInput = false
    }else{
      setError((prevError) => ({...prevError, passwordError: "",}));
    }
    //NOTE - I didn't know there was percentages to regex but this is a 99% proof one for emails
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.email)){
      setError((prevError) => ({...prevError, emailError: "Invalid Email",}));
      goodInput = false
    }else{
      setError((prevError) => ({...prevError, emailError: "",}));
    }
    return goodInput
  }
  const isNewEmail = async (e) =>{
    let validEmail = true 
    let response = await axios(`/users/${input.email}`)
    console.log(response)
    let email = response.data
    if(email == input.email) validEmail = false
    return validEmail
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    let isGoodInput = await isValidInput(e)
    let isEmailAvailable = await isNewEmail(e)
    if(!isGoodInput || !isEmailAvailable) return
    axios({
      method: "POST",
      url: '/users/create',
      data: {
        email: input.email,
        password: input.password
      }
    })
    setInput({
      email: "",
      password: "",
      confirmPassword: ""
    })
  }
  return (
    <form style={{display: "grid"}} onSubmit={handleSubmit}>
      <label htmlFor='email'>email</label>
      <input type='text' name='email' value={input.email} onChange={(e) =>{setInput({...input, [e.target.name]: e.target.value})}}/>
      <label htmlFor='password'>password</label>
      <input type='text' name='password' value={input.password} onChange={(e) =>{setInput({...input, [e.target.name]: e.target.value})}}/>
      <label htmlFor='confirmPassword'>confirm password</label>
      <input type='text' name='confirmPassword' value={input.confirmPassword} onChange={(e) =>{setInput({...input, [e.target.name]: e.target.value})}}/>
      <button>Submit</button>
      <p>{error.emailError}</p>
      <p>{error.passwordError}</p>
    </form>
  )
}

export default Signup