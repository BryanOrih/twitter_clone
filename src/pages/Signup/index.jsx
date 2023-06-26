import React, { useState, useEffect } from 'react'

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
  const handleInput = (e) =>{
    setInput({...input, [e.target.name]: e.target.value})
  }
  useEffect(() => {
    console.log(error);
  }, [error]);
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(input.confirmPassword !== input.password){
      setError((prevError) => ({...prevError, passwordError: "Passwords don't match",}));
    }else{
      setError((prevError) => ({...prevError, passwordError: "",}));
    }
    //NOTE - I didn't know there was percentages to regex but this is a 99% proof one for emails
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.email)){
      setError((prevError) => ({...prevError, emailError: "Invalid Email",}));
    }else{
      setError((prevError) => ({...prevError, emailError: "",}));
    }
  }
  return (
    <form style={{display: "grid"}} onSubmit={handleSubmit}>
      <label htmlFor='email'>email</label>
      <input type='text' name='email' value={input.email} onChange={handleInput}/>
      <label htmlFor='password'>password</label>
      <input type='text' name='password' value={input.password} onChange={handleInput}/>
      <label htmlFor='confirmPassword'>confirm password</label>
      <input type='text' name='confirmPassword' value={input.confirmPassword} onChange={handleInput}/>
      <button>Submit</button>
      {error.emailError}
      <br/>
      {error.passwordError}
    </form>
  )
}

export default Signup