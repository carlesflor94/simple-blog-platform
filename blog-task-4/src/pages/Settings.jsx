import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

export default function Settings() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      avatar: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        password: "",
        repeatPassword: "",
        avatar: user.image || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (formUpdateUser) => {
    try {
      const updatedUser = {
        username: formUpdateUser.username,
        email: formUpdateUser.email,
      };

      if (formUpdateUser.password) {
        updatedUser.password = formUpdateUser.password;
      }

      if (formUpdateUser.avatar) {
        updatedUser.image = formUpdateUser.avatar;
      }

      const data = await api.put("/user", updatedUser);

      login(data.user);
      navigate(`/profile/${data.user.username}`);
    } catch (err) {
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages.join(", "),
          });
        });
      } else {
        alert("Update failed");
      }
    }
  };

  return (
    <div className="signup-container general-container">
      <h1 className="signup-title">Your Settings</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="signup-form general-form"
      >
        <input
          type="text"
          className="general-user-input"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters",
            },
          })}
        />
        {errors.username && (
          <p className="signup-error">{errors.username.message}</p>
        )}
        <input
          type="text"
          className="general-user-input"
          placeholder="Email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <p className="signup-error">{errors.email.message}</p>}
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must not exceed 40 characters",
            },
          })}
        />
        {errors.password && (
          <p className="signup-error">{errors.password.message}</p>
        )}
        <input
          type="password"
          className="general-user-input"
          placeholder="Repeat Password"
          {...register("repeatPassword", {
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.repeatPassword && (
          <p className="signup-error">{errors.repeatPassword.message}</p>
        )}
        <input
          type="text"
          className="general-user-input"
          placeholder="Avatar URL"
          {...register("avatar", {
            validate: (value) =>
              !value ||
              (() => {
                try {
                  new URL(value);
                  return true;
                } catch {
                  return "User image must be a valid URL";
                }
              })(),
          })}
        />
        {errors.avatar && (
          <p className="signup-error">{errors.avatar.message}</p>
        )}

        <div className="signup-bottom-container">
          <div className="signup-checkbox-wrapper"></div>
          <Button type="submit">Update Settings</Button>
        </div>
      </form>
    </div>
  );
}
