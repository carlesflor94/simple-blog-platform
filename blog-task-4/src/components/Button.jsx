export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const variantClass =
    variant === "secondary"
      ? "general-button article-delete-button"
      : "general-button";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}
