import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Realworld Blog</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="newpost">New Post</NavLink>
          <NavLink to="settings">Settings</NavLink>
          <NavLink to="signin">Sign In</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
