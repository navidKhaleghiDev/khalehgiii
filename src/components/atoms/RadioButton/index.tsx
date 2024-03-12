// CustomRadioButton.js

function RadioButton({ value, label, checked, onChange }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="bg-red-500 ">
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export default RadioButton;
