import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../img/default-logo.png";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page general-container">
      <div className="profile-banner">
        <img
          src={user.image || defaultAvatar}
          className="profile-picture"
          alt="user profile picture"
        />
        <h2 className="profile-title">{user.username}</h2>
        <button className="profile-follow-button general-button">Follow</button>
      </div>

      <div className="profile-feed">
        <p>Your Feed</p>
      </div>

      <div className="home-tags general-container">
        <p>Popular tags</p>
        <div className="general-tags">
          <button>one</button>
          <button>something</button>
          <button>chinese</button>
          <button>english</button>
          <button>spanish</button>
        </div>
      </div>
    </div>
  );
}
