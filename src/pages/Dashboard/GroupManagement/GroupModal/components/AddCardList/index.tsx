// import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';
import { BaseCheckBoxProps } from '@ui/atoms/Inputs/BaseCheckBox/types';
import { FieldValues, Control } from 'react-hook-form';

type AddCardListProps = {
  id: string;
  label: string;
  name: string;
  control: Control;
  onChangeCheckBox: BaseCheckBoxProps<FieldValues>['onChange'];
};

export function AddCardList({
  id,
  label,
  name,
  onChangeCheckBox,
  control,
}: AddCardListProps) {
  return (
    <div key={id} className="bg-gray-100 rounded-lg p-2 flex items-center mx-2">
      {id && (
        <BaseCheckBox
          key={id}
          name={name}
          onChange={onChangeCheckBox}
          label={label}
          id={`checkbox-${id}`}
          control={control}
        />
      )}
      {/* <Circle id className="mr-auto" /> */}
    </div>
  );
}
