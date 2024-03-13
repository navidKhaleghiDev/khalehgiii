// CustomRadioButton.js

export interface IRadioButton {
  value: any;
  label: string;
  checked: boolean;
  onChange: any;
}

function RadioButton({ value, label, checked, onChange }: IRadioButton) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className=" flex gap-2">
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export default RadioButton;
