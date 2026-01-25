import React, { useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
import bgIntro from "../Components/Assets/bgintro.jpg";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* ================= GOOGLE AUTH INIT ================= */
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    const btn = document.getElementById("google-btn");
    if (btn) {
      btn.innerHTML = "";
      window.google.accounts.id.renderButton(btn, {
        theme: "outline",
        size: "large",
        width: 300,
      });
    }
  }, [state]);

  /* ================= GOOGLE CALLBACK ================= */
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
        alert("Google authentication failed");
      }
    } catch (err) {
      console.error(err);
      alert("Google login error");
    }
  };

  /* ================= FORM HANDLER ================= */
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= LOGIN ================= */
  const login = async () => {
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert("Invalid credentials");
    }
  };

  /* ================= SIGNUP ================= */
  const signup = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_BACKEND_URL}/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
    } else {
      alert("Signup failed");
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
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
          />

          {state === "Sign Up" && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
            />
          )}
        </div>

        <button onClick={state === "Login" ? login : signup}>
          Continue
        </button>

        {/* ===== GOOGLE LOGIN ===== */}
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