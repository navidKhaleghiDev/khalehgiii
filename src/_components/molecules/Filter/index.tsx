import { Card, Typography } from '@ui/atoms';
import { BaseSelect } from '@ui/atoms/Inputs/BaseSelect';
import { useForm } from 'react-hook-form';

export function FilterServices() {
  const { control } = useForm();
  return (
    <Card color="neutral" className="self-start py-1 px-3 flex flex-col w-full">
      <>
        <Typography variant="body3" color="teal">
          مرتب سازی بر اساس
        </Typography>
        <div className="flex w-full justify-between items-center ">
          <BaseSelect
            control={control}
            selectOptions={[{ id: 1, label: 'item one', value: 'item one' }]}
            id="sort-as"
            name="sortAs"
            placeholder="بنویسید"
          />
          {/* <BaseInput id="search"  name="search" placeholder="... جستجو" /> */}
        </div>
      </>
    </Card>
  );
}
