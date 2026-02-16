import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [formSignUp, setFormSignUp] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormSignUp({
      ...formSignUp,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formSignUp.agree) {
      setErrors({ agree: ["You must agree to give your personal data."] });
      return;
    }

    if (formSignUp.password !== formSignUp.repeatPassword) {
      setErrors({ password: ["Passwords do not match."] });
      return;
    }

    try {
      const data = await api.post("/users", {
        user: {
          username: formSignUp.username,
          email: formSignUp.email,
          password: formSignUp.password,
        },
      });

      login(data.user);
      navigate("/");
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <div className="signup-container general-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form general-form">
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
          value={formSignUp.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="general-user-input"
          placeholder="Email address"
          name="email"
          value={formSignUp.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          name="password"
          value={formSignUp.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={formSignUp.password}
          onChange={handleChange}
          required
        />

        <div className="signup-bottom-container">
          <label className="signup-checkbox">
            <input
              type="checkbox"
              name="agree"
              className="signup-checkbox-input"
              checked={formSignUp.agree}
              onChange={handleChange}
            />
            I give consent to use my personal data
          </label>
          <button className="general-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
