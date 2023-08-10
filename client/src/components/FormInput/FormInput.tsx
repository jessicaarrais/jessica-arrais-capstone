import "./FormInput.scss";

type FormInputProps = {
  label: string,
  name: string,
  type: React.HTMLInputTypeAttribute,
  value: string | number | readonly string[],
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>,
};

export default function FormInput({
  label,
  name,
  type,
  value,
  handleOnChange,
}: FormInputProps) {
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
