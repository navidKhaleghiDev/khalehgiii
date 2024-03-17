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

// const inputData = {
//   ' 2024-03-01 00:00:00': 4,
//   '2024-03-02 00:00:00': 6,
//   '2024-03-03 00:00:00': 7,
//   '2024-03-04 00:00:00': 9,
//   '2024-03-05 00:00:00': 10,
//   '2024-03-06 00:00:00': 5,
//   '2024-03-07 00:00:00': 8,
//   '2024-03-08 00:00:00': 9,
//   '2024-03-09 00:00:00': 4,
//   '2024-03-10 00:00:00': 7,
//   '2024-03-11 00:00:00': 5,
//   '2024-03-12 00:00:00': 8,
//   '2024-03-13 00:00:00': 9,
//   '2024-03-14 00:00:00': 3,
//   '2024-03-15 00:00:00': 1,
// };
