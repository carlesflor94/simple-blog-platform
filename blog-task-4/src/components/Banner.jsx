export default function Banner({
  children,
  background = "#333333",
  align = "center",
  className = "",
}) {
  return (
    <div
      className={`banner ${className}`}
      style={{ backgroundColor: background }}
    >
      <div className={`general-container banner-inner banner-${align}`}>
        {children}
      </div>
    </div>
  );
}
