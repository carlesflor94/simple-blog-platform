import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header className="app-header">
        <div className="header-wrapper">
          <div className="header-title">
            <h1>Realworld Blog</h1>
          </div>
          <nav className="header-nav">
            <NavLink to="/" className="header-nav-item">
              Home
            </NavLink>
            <NavLink to="newpost" className="header-nav-item">
              New Post
            </NavLink>
            <NavLink to="settings" className="header-nav-item">
              Settings
            </NavLink>
            <NavLink to="signin" className="header-nav-item">
              Sign In
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
