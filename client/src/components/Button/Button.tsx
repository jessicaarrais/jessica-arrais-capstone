import "./Button.scss";

type ButtonProps = {
  emphasis: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  text?: string;
  mHidden?: boolean;
  handleOnClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  emphasis,
  type,
  icon,
  text,
  mHidden,
  handleOnClick,
}: ButtonProps) {
  return (
    <button
      className={`default-button default-button--${emphasis} ${
        mHidden ? "default-button--mHidden" : ""
      }`}
      type={type}
      onClick={handleOnClick}
    >
      {icon && (
        <img src={icon} className="default-button__icon" alt="button icon" />
      )}
      {text && (
        <p
          className={`default-button__text ${
            mHidden ? "default-button__text--mHidden" : ""
          }`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
