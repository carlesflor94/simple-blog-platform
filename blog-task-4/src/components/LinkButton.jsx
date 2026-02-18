import { Link } from "react-router-dom";

export default function LinkButton({
  to,
  children,
  className = "general-button",
}) {
  return (
    <Link to={to} className={`${className}`}>
      {children}
    </Link>
  );
}
