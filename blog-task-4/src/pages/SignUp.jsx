import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function SignUp() {
  const [formSignUp, setFormSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormSignUp({ ...formSignUp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users", {
        user: form,
      });

      login(res.data.user);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data?.errors);
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
          value={formSignUp.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="general-user-input"
          placeholder="Email address"
          value={formSignUp.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          value={formSignUp.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Repeat Password"
          value={formSignUp.password}
          onChange={handleChange}
          required
        />

        <div className="signup-bottom-container">
          <button className="general-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
