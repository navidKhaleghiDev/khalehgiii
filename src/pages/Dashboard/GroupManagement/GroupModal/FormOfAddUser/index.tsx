import { BaseButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { useCallback, useState } from 'react';

// import { useTranslation } from 'react-i18next';

import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';

type FormData = {
  checkboxes: {
    [key: string]: boolean;
  };
};

export function FormOfAddUser() {
  const [filterQuery, setFilterQuery] = useState<string>('');

  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = () => {};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setFilterQuery(query);
    }, 1000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

  return (
    <div>
      <SearchInput
        name=""
        value={filterQuery}
        onChange={handleFilterChange}
        className="w-full"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="w-full space-y-4 h-72 overflow-auto">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
            >
              <BaseCheckBox id="asdsad" name="sadsa" control={control} />
              {/* <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(`checkboxes.${item}` as const)}
            /> */}
              <label className="mx-1" htmlFor={`checkbox-${item}`}>
                <Typography
                  variant="body2"
                  color="neutral"
                >{`Item ${item}`}</Typography>
              </label>
              <Circle id className="mr-auto" />
            </div>
          ))}
        </div>
        <BaseButton label="ثبت" submit size="md" className="mt-4" />
      </form>
    </div>
  );
}
