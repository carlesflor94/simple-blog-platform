import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [formSignIn, setformSignIn] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setformSignIn({ ...formSignIn, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.post("/users/login", {
        user: formSignIn,
      });

      login(data.user);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data?.errors);
    }
  };

  return (
    <div className="signin-container general-container">
      <h1 className="signin-title">Sign In</h1>
      <form onSubmit={handleSubmit} className="signin-form general-form">
        {errors &&
          Object.entries(errors).map(([key, value]) => (
            <p key={key}>
              {key} {value.join(", ")}
            </p>
          ))}
        <input
          type="text"
          className="general-user-input"
          placeholder="Username"
          name="username"
          value={formSignIn.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          name="password"
          value={formSignIn.password}
          onChange={handleChange}
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
