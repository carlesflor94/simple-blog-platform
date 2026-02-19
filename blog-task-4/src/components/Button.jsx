export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary: "general-button",
    secondary: "general-button article-delete-button",
    favorite: "general-button favorite-button",
  };

  const variantClass = variants[variant] || variants.primary;

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
