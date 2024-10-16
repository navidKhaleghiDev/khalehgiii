import useSWR from 'swr';

import { Dropdown } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import PhFunnelSimple from '@iconify-icons/ph/funnel-simple';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';

import {
  domainOptions,
  filterOptions,
  groupOptions,
} from '../constants/constants';

type FilterReportsProps = {
  searchQuery: string;
  handelSearchQuery: (value: string) => void;
  setFilterQuery: (value: OptionSelect | OptionSelect[] | null) => void;
};

export default function FilterReports({
  searchQuery,
  handelSearchQuery,
  setFilterQuery,
}: FilterReportsProps) {
  const { data } = useSWR<IResponseData<TGroup[]>>(
    E_USERS_GROUPS,
    http.fetcherSWR
  );
  const groupOptionDas: OptionSelect[] | undefined = data?.data.map((item) => {
    return {
      id: String(item.id),
      label: item.name,
      value: item.name,
    };
  });

  return (
    <div className="flex items-center gap-[1.875rem] mt-[7.625rem]">
      <SearchInput
        id="adminSearch"
        name="adminSearch"
        onChange={handelSearchQuery}
        value={searchQuery}
        placeholder="جستجوی ادمین"
        hiddenError
        className="top-[0.625rem]"
      />
      {/* This item does not work does not have service */}
      <Dropdown
        name="domain"
        onChange={() => console.log('This functionality does not work know')}
        options={domainOptions}
        placeHolder="انتخاب دامنه"
        size="sm"
      />
      <Dropdown
        name="group"
        onChange={setFilterQuery}
        options={groupOptionDas ?? groupOptions}
        placeHolder="گروه بندی"
        size="sm"
      />
      <BaseDropdownIcon
        icon={PhFunnelSimple}
        options={filterOptions}
        containerClassName="text-sm"
        onSelect={() => console.log('searchItem')}
      />
    </div>
  );
}
