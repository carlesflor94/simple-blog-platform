import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";

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
        <FormInput
          name="username"
          placeholder="Username"
          register={register}
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must not exceed 20 characters",
            },
          }}
          errors={errors}
          className="general-user-input"
        />
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
        <FormInput
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          register={register}
          rules={{
            required: "Repeat your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          }}
          errors={errors}
          className="general-user-input"
        />

        <div className="signup-bottom-container">
          <div className="signup-checkbox-wrapper">
            <label className="signup-checkbox">
              <div className="signup-checkbox-row">
                <FormInput
                  type="checkbox"
                  name="agree"
                  register={register}
                  rules={{
                    required: "You must agree to use your personal data",
                  }}
                  errors={errors}
                  className="signup-checkbox-input"
                />
                I give consent to use my personal data
              </div>
            </label>
          </div>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}
