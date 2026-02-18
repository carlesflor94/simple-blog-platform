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
  return (
    <div className="general-form">
      {label && <label>{label}</label>}

      <Component>
        type={type}
        placeholder={placeholder}
        className={className}
        {...register(name, rules)}
      </Component>

      {errors[name] && <p className="general-error">{errors[name].message}</p>}
    </div>
  );
}
