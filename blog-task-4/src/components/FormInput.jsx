export default function FormInput({
  label,
  name,
  register,
  rules,
  errors,
  type = "text",
  as = "input",
  placeholder,
  className = "",
}) {
  const Component = as;
  const isCheckbox = type === "checkbox";
  return (
    <div className="general-form">
      {!isCheckbox && label && <label>{label}</label>}

      {isCheckbox ? (
        <div className="signup-checkbox">
          <input
            type="checkbox"
            className={className}
            {...register(name, rules)}
          />
          {label && <label htmlFor={name}>{label}</label>}
        </div>
      ) : (
        <Component
          type={type}
          placeholder={placeholder}
          className={className}
          {...register(name, rules)}
        />
      )}

      {errors[name] && <p className="general-error">{errors[name].message}</p>}
    </div>
  );
}
