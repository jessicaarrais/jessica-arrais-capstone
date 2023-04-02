import "./FormInput.scss";

export default function FormInput({
  label,
  name,
  type,
  value,
  handleOnChange,
}) {
  return (
    <div className="input__box">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__input"
        type={type}
        name={name}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}
