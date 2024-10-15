import { useState } from 'react';

import { Dropdown } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import PhFunnelSimple from '@iconify-icons/ph/funnel-simple';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import {
  domainOptions,
  filterOptions,
  groupOptions,
} from '../constants/constants';

// Note : The DropDownWithIcon has been added in another branch (pending)

export default function FilterReports() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex items-center gap-[1.875rem] mt-[7.625rem]">
      <SearchInput
        id="adminSearch"
        name="adminSearch"
        onChange={(value) => setSearchValue(value)}
        value={searchValue}
        placeholder="جستجوی ادمین"
        hiddenError
        className="top-[0.625rem]"
      />
      {/* This feacher does not work */}
      <Dropdown
        name="domain"
        onChange={(data) => console.log(data)}
        options={domainOptions}
        placeHolder="انتخاب دامنه"
        size="sm"
        className="text-black "
      />
      <Dropdown
        name="group"
        onChange={(data) => console.log(data)}
        options={groupOptions}
        placeHolder="گروه بندی"
        size="sm"
      />
      <BaseDropdownIcon
        icon={PhFunnelSimple}
        options={filterOptions}
        containerClassName="text-sm"
      />
    </div>
  );
}
