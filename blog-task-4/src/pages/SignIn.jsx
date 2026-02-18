import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";

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
        <FormInput
          name="email"
          placeholder="Email"
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          }}
          errors={errors}
          className="general-user-input"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 40,
              message: "Password must not exceed 40 characters",
            },
          }}
          errors={errors}
          className="general-user-input"
        />

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
