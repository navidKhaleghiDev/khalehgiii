import { Controller } from 'react-hook-form'; // or import useForm
import { BaseInputUploadImage } from '..';

export function BaseInputUploadImageController(props) {
  const { name, control, rules, disabled } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, name: userName, value } }) => {
        return (
          <BaseInputUploadImage
            name={userName}
            disabled={disabled}
            onChange={(e) => onChange(e)}
            defaultValue={value}
          />
        );
      }}
    />
  );
}
