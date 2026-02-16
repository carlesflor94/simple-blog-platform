import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import newpostimg from "../img/newpost.svg";
import settingsimg from "../img/settings.svg";
import profileimg from "../img/profile.svg";

export default function RootLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="root-layout">
      <header className="app-header">
        <div className="header-wrapper general-container">
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
                <button
                  onClick={logout}
                  className="header-nav-item header-logout"
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
