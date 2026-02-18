import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (formSignUp) => {
    try {
      const response = await api.post("/users", {
        user: {
          username: formSignUp.username,
          email: formSignUp.email,
          password: formSignUp.password,
        },
      });

      login(response.user);
      navigate("/");
    } catch (err) {
      if (err.errors) {
        Object.entries(err.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: messages.join(", "),
          });
        });
      }
    }
  };

  return (
    <div className="signup-container general-container">
      <h1 className="signup-title">Sign Up</h1>
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
          type="email"
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
            required: "Password is required",
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
            required: "Repeat your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.repeatPassword && (
          <p className="signup-error">{errors.repeatPassword.message}</p>
        )}

        <div className="signup-bottom-container">
          <div className="signup-checkbox-wrapper">
            <label className="signup-checkbox">
              <input
                type="checkbox"
                className="signup-checkbox-input"
                {...register("agree", {
                  required: "You must agree to use your personal data",
                })}
              />
              I give consent to use my personal data
            </label>
            {errors.agree && (
              <p className="signup-error">{errors.agree.message}</p>
            )}
          </div>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}
