import React, { useState } from "react";
import "../App.css";
import supabaseLogin from "../Config/supabaseLoginAuth";
import { Link, useNavigate } from "react-router-dom";

function EmailSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(""); //errors

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    try {
      const { data, error } = await supabaseLogin.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      alert("check your eamil for verification link ");

      if (error) {
        console.error("sign error:", error.message);
      }

      if (data) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during sign:", error.message);
    }
  };

  const myInlineStyle = {
    color: "red",
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="formOne">
        <h1>Sign Up</h1>
        <label htmlFor="name">Name: </label>
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

         <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className="error" style={myInlineStyle}>
            Passwords don't match
          </p>
        )}
        <button type="submit" className="buttonOne">
          Sign Up
        </button>
        <div className="SignUp">
          Already a User? <Link to={"/"}>Login</Link>
        </div>

        {formError && (
          <p className="error" style={myInlineStyle}>
            {formError}
          </p>
        )}
      </form>
    </div>
  );
}

export default EmailSignUp;
