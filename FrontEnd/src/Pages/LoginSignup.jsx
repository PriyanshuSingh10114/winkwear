import React, { useEffect, useState } from 'react'
import './CSS/LoginSignup.css'
import bgIntro from '../Components/Assets/bgintro.jpg'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: "outline",
        size: "large",
        width: 300,
      }
    );
  }, [state]);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Google authentication failed");
      }
    } catch (error) {
      console.error(error);
      alert("Google login error");
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in email and password");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert(data.errors || "Login failed");
    }
  };

  const signup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert(data.errors || "Signup failed");
    }
  };

  return (
    <div
      className="loginsignup"
      style={{ background: `url(${bgIntro}) center/cover` }}
    >
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email"
          />

          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>

        <button onClick={state === "Login" ? login : signup}>
          Continue
        </button>

        {/* ===== GOOGLE AUTH WRAPPED AS PER CSS ===== */}
        <div className="google-auth">
          <div className="google-auth-divider">
            <span>OR</span>
          </div>
          <div id="google-btn"></div>
        </div>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>I agree to the terms & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
