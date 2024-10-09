import { useState } from 'react';

import { Dropdown } from '@redesignUi/atoms';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import PhFunnel from '@iconify-icons/ph/funnel';
import { DropDownWithIcon } from '@ui/atoms/DropDownWithIcon';

export default function FilterReports() {
  const [searchValue, setSearchValue] = useState('');

  const domainOptions: OptionSelect[] = [
    {
      id: 1,
      label: 'sep.npd-co.com',
      value: 'sep.npd-co.com',
    },
    {
      id: 2,
      label: 'fence.npd-co.com',
      value: 'fence.npd-co.com',
    },
    {
      id: 3,
      label: 'stage.npd-co.com',
      value: 'stage.npd-co.com',
    },
  ];
  const groupOptions: OptionSelect[] = [
    {
      id: 1,
      label: 'Human Resource',
      value: 'Human Resource',
    },
    {
      id: 2,
      label: 'commercial',
      value: 'commercial',
    },
    {
      id: 3,
      label: 'media',
      value: 'media',
    },
  ];
  const filterOptions = [
    { id: '1', value: 'alphabtic', label: 'حروف الفبا' },
    { id: '2', value: 'date', label: 'تاریخ ایجاد' },
    { id: '3', value: 'newest', label: 'جدیدترین' },
  ];

  return (
    <div className="flex items-center gap-[1.875rem] mt-[7.625rem]">
      <SearchInput
        id="adminSearch"
        name="adminSearch"
        onChange={(value) => setSearchValue(value)}
        value={searchValue}
        placeholder="جستجوی ادمین"
        fullWidth
      />
      <Dropdown
        name="domain"
        onChange={(data) => console.log(data)}
        options={domainOptions}
        placeHolder="انتخاب دامنه"
      />
      <Dropdown
        name="group"
        onChange={(data) => console.log(data)}
        options={groupOptions}
        placeHolder="گروه بندی"
      />
      <DropDownWithIcon icon={PhFunnel} options={filterOptions} />
    </div>
  );
}
