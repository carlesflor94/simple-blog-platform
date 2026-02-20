import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import newpostimg from "../img/newpost.svg";
import settingsimg from "../img/settings.svg";
import profileimg from "../img/profile.svg";

export default function RootLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const borderHidden =
    location.pathname === "/" || location.pathname.startsWith("/profile");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="root-layout">
      <header className="app-header">
        <div
          className={`header-wrapper general-container ${
            borderHidden ? "header-no-border" : ""
          }`}
        >
          <div className="header-title">
            <h1>Realworld Blog</h1>
          </div>
          <nav className="header-nav">
            <NavLink to="/" className="header-nav-item">
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink to="newpost" className="header-nav-item">
                  <img src={newpostimg} alt="new post logo" />
                  New Post
                </NavLink>
                <NavLink to="settings" className="header-nav-item">
                  <img src={settingsimg} alt="settings logo" />
                  Settings
                </NavLink>
                <NavLink
                  to={`profile/${user.username}`}
                  className="header-nav-item"
                >
                  <img src={profileimg} alt="profile logo" />
                  {user.username}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="header-nav-item header-logout-button"
                >
                  Log Out
                </button>
              </>
            ) : (
              <NavLink to="signin" className="header-nav-item">
                <img src={profileimg} alt="sign in logo" />
                Sign In
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
