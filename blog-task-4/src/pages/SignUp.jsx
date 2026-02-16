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
    let signUpErrors = {};

    if (formSignUp.username.length < 3 || formSignUp.username.length > 20) {
      signUpErrors.username = [
        "Username must be between 3 and 20 characters long",
      ];
    }

    if (!formSignUp.email.includes("@")) {
      signUpErrors.email = ["Invalid email"];
    }

    if (formSignUp.password.length < 6 || formSignUp.password.length > 40) {
      signUpErrors.password = [
        "Password must be between 6 and 20 characters long",
      ];
    }

    if (!formSignUp.agree) {
      signUpErrors.agree = ["You must agree to use your personal data"];
    }

    if (formSignUp.password !== formSignUp.repeatPassword) {
      signUpErrors.repeatPassword = ["Passwords do not match"];
    }

    if (Object.keys(signUpErrors).length > 0) {
      setErrors(signUpErrors);
      return;
    }

    setErrors({});

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
        <input
          type="text"
          className="general-user-input"
          placeholder="Username"
          name="username"
          value={formSignUp.username}
          onChange={handleChange}
          required
        />
        {errors?.username && (
          <p className="signup-error">{errors.username.join(", ")}</p>
        )}
        <input
          type="text"
          className="general-user-input"
          placeholder="Email address"
          name="email"
          value={formSignUp.email}
          onChange={handleChange}
          required
        />
        {errors?.email && (
          <p className="signup-error">{errors.email.join(", ")}</p>
        )}
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          name="password"
          value={formSignUp.password}
          onChange={handleChange}
          required
        />
        {errors?.password && (
          <p className="signup-error">{errors.password.join(", ")}</p>
        )}
        <input
          type="password"
          className="general-user-input"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={formSignUp.repeatPassword}
          onChange={handleChange}
          required
        />
        {errors?.repeatPassword && (
          <p className="signup-error">{errors.repeatPassword.join(", ")}</p>
        )}

        <div className="signup-bottom-container">
          <div className="signup-checkbox-wrapper">
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
            {errors?.agree && (
              <p className="signup-error">{errors.agree.join(", ")}</p>
            )}
          </div>
          <button className="general-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
