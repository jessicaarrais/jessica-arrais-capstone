import "./Button.scss";

export default function Button({
  emphasis,
  type,
  icon = null,
  text = null,
  mHidden = null,
  handleOnClick = null,
}) {
  return (
    <button
      className={`default-button default-button--${emphasis} default-button--${mHidden}`}
      type={type}
      onClick={handleOnClick}
    >
      {icon && (
        <img src={icon} className="default-button__icon" alt="button icon" />
      )}
      {text && (
        <p className={`default-button__text default-button__text--${mHidden}`}>
          {text}
        </p>
      )}
    </button>
  );
}
