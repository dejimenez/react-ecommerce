import "./form-input.styles.scss";

export default function FormInput({ label, ...otherProps }) {
  const { value } = otherProps;
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label className={`${value.length ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  );
}
