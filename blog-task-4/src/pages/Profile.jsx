import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page general-container">
      <div className="profile-header">
        <h2>{user.username}</h2>
      </div>
    </div>
  );
}
