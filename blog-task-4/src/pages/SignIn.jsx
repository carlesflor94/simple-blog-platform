import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formSignIn) => {
    try {
      const data = await api.post("/users/login", {
        user: formSignIn,
      });

      login(data.user);
      navigate("/");
    } catch (err) {
      if (err.response?.data?.errors) {
        Object.entries(err.response.data.errors).forEach(
          ([field, messages]) => {
            setError(field, {
              type: "server",
              message: messages.join(", "),
            });
          },
        );
      } else {
        setError("root", {
          type: "server",
          message: "Login failed. Please try again.",
        });
      }
    }
  };

  return (
    <div className="signin-container general-container">
      <h1 className="signin-title">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="signin-form general-form"
      >
        {errors.root && <p className="signup-error">{errors.root.message}</p>}
        <input
          type="email"
          className="general-user-input"
          placeholder="Email"
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

        <div className="signin-bottom-container general-container">
          <p className="signin-text">
            Not a user?{" "}
            <Link to="/signup" className="signup-link">
              Click here to sign up!
            </Link>
          </p>
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </div>
  );
}
