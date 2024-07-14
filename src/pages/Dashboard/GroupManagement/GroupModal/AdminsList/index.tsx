import { BaseButton } from '@ui/atoms/BaseButton';
import { Typography } from '@ui/atoms';
import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';
// import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { EditCardList } from '../components/EditCardList';

type AdminsListProps = {
  // handleClose: (isUpdated?: boolean) => void;
  admins?: any;
};

type FormData = {
  checkboxes: {
    [key: string]: boolean;
  };
};

export function AdminsList({ admins }: AdminsListProps) {
  const { t } = useTranslation();
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [isAddNew, setIsAddNew] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const { control, handleSubmit } = useForm<FormData>();
  // const checkboxes = useWatch({
  //   control,
  //   name: 'checkboxes',
  //   defaultValue: {},
  // });

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
  const handleRemoveItem = (id) => {
    // api call remove item
  };

  return (
    <div>
      <SearchInput
        name=""
        value={filterQuery}
        onChange={handleFilterChange}
        className="w-full"
      />
      {!admins && !isAddNew ? (
        <div className="flex flex-col items-center">
          <div className="w-full space-y-4 h-72 overflow-auto">
            {admins.map((item) => (
              <EditCardList
                onClick={handleRemoveItem}
                item={item}
                key={item.id}
              />
            ))}
          </div>
          <BaseButton
            label={t('groupManagement.newAdmin')}
            submit
            size="md"
            onClick={() => setIsAddNew(true)}
            className="mt-4"
            endIcon="ph:plus"
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="w-full space-y-4 h-72 overflow-auto">
            {admins &&
              admins.map((item) => (
                <div
                  key={item}
                  className="bg-neutral-100 rounded-lg p-2 flex items-center mx-2"
                >
                  <BaseCheckBox id="asdsad" name="sadsa" control={control} />
                  <label className="mx-1" htmlFor={`checkbox-${item.id}`}>
                    <Typography variant="body2" color="neutral">
                      {item.name}
                    </Typography>
                  </label>
                  {/* <Circle id className="mr-auto" /> */}
                </div>
              ))}
          </div>

          <div className="w-full flex justify-between">
            {isAddNew && (
              <BaseButton
                label={t('global.cancel')}
                submit
                size="md"
                onClick={() => setIsAddNew(false)}
                type="secondary"
                className="mt-4"
                endIcon="pha:x"
              />
            )}
            <BaseButton
              label={t('global.confirm')}
              submit
              size="md"
              onClick={() => setShowConfirm(true)}
              className="mt-4"
            />
          </div>
        </form>
      )}
    </div>
  );
}
