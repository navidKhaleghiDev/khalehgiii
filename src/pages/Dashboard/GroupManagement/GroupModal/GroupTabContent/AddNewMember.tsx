import { BaseButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { AddCardList } from '@src/pages/Dashboard/GroupManagement/GroupModal/components/AddCardList';
import { IDaAs } from '@src/services/users/types';

import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { IResponsePagination } from '@src/types/services';
import useSWR from 'swr';
import { http } from '@src/services/http';
import { createAPIEndpoint } from '@src/helper/utils';
import { E_USERS_DAAS } from '@src/services/users/endpoint';
import { LoadingSpinner } from '@ui/molecules/Loading';

import { EditGroupMembers } from '@src/pages/Dashboard/GroupManagement/GroupModal/GroupTabContent/EditGroupMembers';

type AddNewMemberProps = {
  control: Control<any>;
  isUpdatingGroupMember: boolean;
  onCancel: () => void;
  onClickMainButton: () => void;
  name: string;
};
const PAGE_SIZE = 8;

export function AddNewMember({
  control,
  isUpdatingGroupMember,
  onCancel,
  onClickMainButton,
  name,
}: AddNewMemberProps) {
  const { t } = useTranslation();
  // const { watch } = useFormContext();

  const endpoint = createAPIEndpoint({
    endPoint: E_USERS_DAAS,
    pageSize: PAGE_SIZE,
    currentPage: 1,
    filterQuery: '',
  });

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    endpoint,
    http.fetcherSWR
  );
  const listDaas: IDaAs[] = data?.data?.results ?? [];

  return (
    <div className="flex flex-col items-center ">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full space-y-4 h-72 overflow-auto">
          {listDaas.map((item: IDaAs) => (
            <AddCardList
              key={item.id}
              id={item.id}
              label={'email' in item ? item.email : ''}
              // selectedValue={watch('admins')}
              name={name}
              data={item}
              control={control}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-between">
        {isUpdatingGroupMember && (
          <BaseButton
            label={t('global.cancel')}
            size="md"
            onClick={onCancel}
            type="secondary"
            className="mt-4"
            endIcon="pha:x"
            disabled={isLoading}
          />
        )}
        <BaseButton
          label={
            isUpdatingGroupMember
              ? t('global.confirm')
              : t('groupManagement.next')
          }
          size="md"
          onClick={onClickMainButton}
          className="mt-4"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
