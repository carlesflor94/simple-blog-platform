export default function SignUp() {
  return (
    <div className="signup-container general-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form general-form">
        <input
          type="text"
          className="general-user-input"
          placeholder="Username"
          required
        />
        <input
          type="text"
          className="general-user-input"
          placeholder="Email address"
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Password"
          required
        />
        <input
          type="password"
          className="general-user-input"
          placeholder="Repeat Password"
          required
        />

        <div className="signin-bottom-container general-container">
          <button className="general-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
