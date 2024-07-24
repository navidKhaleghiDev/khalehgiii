import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { BaseCustomCheckBox } from '@ui/atoms/Inputs/BaseCustomCheckBox';

type AddCardListProps = {
  id: string;
  label: string;
  selectedValue?: any;
  name: string;
  data: any;
  control: any;
};

export function AddCardList({
  id,
  label,
  selectedValue,
  name,
  data,
  control,
}: AddCardListProps) {
  return (
    <div
      key={id}
      className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
    >
      {id && (
        <BaseCustomCheckBox
          defaultValue={selectedValue}
          key={id}
          name={name}
          data={data}
          label={label}
          id={`checkbox-${id}`}
          control={control}
        />
      )}
      <Circle id className="mr-auto" />
    </div>
  );
}
