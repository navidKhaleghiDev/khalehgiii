import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import PhFunnelSimple from '@iconify-icons/ph/funnel-simple';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { useLanguage } from '@context/settings/languageContext';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';

import { domainsMock } from '../constants/constants';

type FilterReportsProps = {
  searchQuery: string;
  handelSearchQuery: (value: string) => void;
  handelFilterList: (value: OptionSelect | OptionSelect[] | null) => void;
  handelListSort: (value: string) => void;
};

export default function FilterReports({
  searchQuery,
  handelSearchQuery,
  handelFilterList,
  handelListSort,
}: FilterReportsProps) {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  const { data, isLoading } = useSWR<IResponseData<TGroup[]>>(
    E_USERS_GROUPS,
    http.fetcherSWR
  );
  const filterOptions = [
    { id: '1', value: 'alphabetic', label: t('fileScan.alphabetic') },
    { id: '2', value: 'date', label: t('fileScan.creationDate') },
    { id: '3', value: 'newest', label: t('fileScan.Newest') },
  ];
  const daasGroups: OptionSelect[] = data
    ? data.data.map((item) => {
        return {
          id: String(item.id),
          label: item.name,
          value: item.name,
        };
      })
    : [];

  // Note: cause the dropdown has the service call for the groups it may have skelton
  return (
    <div className="flex items-center gap-[1.875rem] mt-[7.625rem]">
      <SearchInput
        id="adminSearch"
        name="adminSearch"
        onChange={handelSearchQuery}
        value={searchQuery}
        placeholder={t('fileScan.adminSearch')}
        hiddenError
        dir={dir === 'rtl' ? 'rtl' : 'ltr'}
        className="top-[0.625rem]"
      />
      {/* This item does not work does not have service */}
      <Dropdown
        name="domain"
        onChange={() => console.log('This dropDown functionality is not ready')}
        options={domainsMock}
        disabled // disable the functionality untie the service is ready
        placeHolder={t('fileScan.choseDomain')}
        size="sm"
      />
      <Dropdown
        name="group"
        onChange={handelFilterList}
        options={daasGroups}
        placeHolder={t('fileScan.grouping')}
        disabled={isLoading}
        size="sm"
      />
      <BaseDropdownIcon
        icon={PhFunnelSimple}
        options={filterOptions}
        containerClassName="text-sm"
        onSelect={handelListSort}
      />
    </div>
  );
}