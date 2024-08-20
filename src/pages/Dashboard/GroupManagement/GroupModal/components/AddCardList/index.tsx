import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';
import { BaseCheckBoxProps } from '@ui/atoms/Inputs/BaseCheckBox/types';
import { FieldValues } from 'react-hook-form';

type AddCardListProps = {
  id: string;
  label: string;
  selectedValue?: any;
  name: string;
  control: any;
  onChangeCheckBox: BaseCheckBoxProps<FieldValues>['onChange'];
};

export function AddCardList({
  id,
  label,
  selectedValue,
  name,
  onChangeCheckBox,
  control,
}: AddCardListProps) {
  return (
    <div
      key={id}
      className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
    >
      {id && (
        <BaseCheckBox
          defaultValue={selectedValue}
          key={id}
          name={name}
          onChange={onChangeCheckBox}
          label={label}
          id={`checkbox-${id}`}
          control={control}
        />
      )}
      <Circle id className="mr-auto" />
    </div>
  );
}
