import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const [errors, setErrors] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formUpdateUser, setFormUpdateUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    repeatPassword: "",
    avatar: user?.image || "",
  });

  const urlValid = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      setFormUpdateUser({
        username: user.username,
        email: user.email,
        password: "",
        repeatPassword: "",
        avatar: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateErrors = {};

    if (
      formUpdateUser.username.length < 3 ||
      formUpdateUser.username.length > 20
    ) {
      updateErrors.username = [
        "Username must be between 3 and 20 characters long",
      ];
    }

    if (!formUpdateUser.email.includes("@")) {
      updateErrors.email = ["Invalid email"];
    }

    if (
      formUpdateUser.password &&
      (formUpdateUser.password.length < 6 ||
        formUpdateUser.password.length > 40)
    ) {
      updateErrors.password = [
        "Password must be between 6 and 40 characters long",
      ];
    }

    if (
      formUpdateUser.password &&
      formUpdateUser.password !== formUpdateUser.repeatPassword
    ) {
      updateErrors.repeatPassword = ["Passwords do not match"];
    }

    if (formUpdateUser.avatar && !urlValid(formUpdateUser.avatar)) {
      updateErrors.avatar = ["Avatar is not a valid URL"];
    }

    if (Object.keys(updateErrors).length > 0) {
      setErrors(updateErrors);
      return;
    }

    setErrors({});

    try {
      const updatedUser = {};

      if (formUpdateUser.username !== user.username) {
        updatedUser.username = formUpdateUser.username;
      }

      if (formUpdateUser.email !== user.email) {
        updatedUser.email = formUpdateUser.email;
      }

      if (formUpdateUser.password) {
        updatedUser.password = formUpdateUser.password;
      }

      if (formUpdateUser.avatar !== (user.image || "")) {
        updatedUser.image = formUpdateUser.avatar;
      }

      if (Object.keys(updatedUser).length === 0) {
        return;
      }

      const data = await api.put("/user", {
        user: updatedUser,
      });

      login(data.user);
      navigate(`/profile/${data.user.username}`);
    } catch (err) {
      console.log("Update failed:", err);
      setErrors(err?.errors || { general: ["Update failed"] });
    }
  };

  return (
    <div className="signup-container general-container">
      <h1 className="signup-title">Your Settings</h1>
      <form onSubmit={handleSubmit} className="signup-form general-form">
        <input
          type="text"
          className="general-user-input"
          placeholder="Username"
          name="username"
          value={formUpdateUser.username}
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
          value={formUpdateUser.email}
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
          value={formUpdateUser.password}
          onChange={handleChange}
        />
        {errors?.password && (
          <p className="signup-error">{errors.password.join(", ")}</p>
        )}
        <input
          type="password"
          className="general-user-input"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={formUpdateUser.repeatPassword}
          onChange={handleChange}
        />
        {errors?.repeatPassword && (
          <p className="signup-error">{errors.repeatPassword.join(", ")}</p>
        )}
        <input
          type="text"
          className="general-user-input"
          placeholder="Avatar URL"
          name="avatar"
          value={formUpdateUser.avatar}
          onChange={handleChange}
        />
        {errors?.avatar && (
          <p className="signup-error">{errors.avatar.join(", ")}</p>
        )}

        <div className="signup-bottom-container">
          <div className="signup-checkbox-wrapper"></div>
          <button className="general-button">Update Settings</button>
        </div>
      </form>
    </div>
  );
}
