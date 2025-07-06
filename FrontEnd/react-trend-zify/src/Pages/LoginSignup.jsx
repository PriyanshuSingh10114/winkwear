import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import bgIntro from '../Components/Assets/bgintro.jpg'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password.");
    return;
    }
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors || "An error occurred");

    }
  }

  const signup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in name, email, and password.");
      return;
    }
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors || "An error occurred");
    }
  }

  return (
    <div
      className="loginsignup"
      style={{
        background: `url(${bgIntro}) center/cover`,
        position: "relative"
      }}
    >
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder='Your Name'
            />
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>
        <button onClick={state === 'Login' ? login : signup}>Continue</button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => { setState("Login") }}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Continuing I agree to the term of use and privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup