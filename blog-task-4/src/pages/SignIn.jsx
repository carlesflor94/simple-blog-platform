import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [formSignIn, setformSignIn] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formSignIn);
  };

  return (
    <div className="signin-container general-container">
      <h1 className="signin-title">Sign In</h1>
      <form onSubmit={handleSubmit} className="signin-form general-form">
        <input
          type="text"
          className="general-user-input"
          placeholder="Username"
          value={formSignIn.username}
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          value={formSignIn.password}
          required
        />

        <div className="signin-bottom-container general-container">
          <p className="signin-text">
            Not a user?{" "}
            <Link to="/signup" className="signup-link">
              Click here to sign up!
            </Link>
          </p>
          <button className="general-button">Sign In</button>
        </div>
      </form>
    </div>
  );
}
