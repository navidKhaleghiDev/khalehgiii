import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import pluse from '@iconify-icons/ph/plus-bold';
import { BaseButton, Dropdown } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import PhFunnelSimple from '@iconify-icons/ph/funnel-simple';
import { BaseDropdownIcon } from '@redesignUi/atoms/BaseDropdownIcon';
import { useLanguage } from '@context/settings/languageContext';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';

import { domainsMock, FilterReportsProps, domainFilterOptions } from './types';

export default function FilterTableList(props: FilterReportsProps) {
  const {
    searchQuery,
    searchPlaceholder,
    domainFilter,
    sortFilter,
    buttonLabel,
    handelSearchQuery,
    handelGroupeFilter,
    handelListSort,
    onClickButton,
  } = props;

  const { t } = useTranslation();
  const { dir } = useLanguage();

  const { data, isLoading, error } = useSWR<IResponseData<TGroup[]>>(
    E_USERS_GROUPS,
    http.fetcherSWR
  );

  const daasGroups: OptionSelect[] = useMemo(
    () =>
      data?.data.map((item) => ({
        id: String(item.id),
        label: item.name,
        value: item.name,
      })) ?? [],
    [data]
  );

  return (
    <div className="flex items-center justify-center sm:justify-start flex-wrap gap-y-2.5 gap-x-[1.875rem]">
      <div
        className={`${sortFilter && buttonLabel ? 'w-40' : 'w-full'} ${
          sortFilter ? 'sm:w-40' : 'sm:w-[15.9rem]'
        } md:w-[15.9rem] order-3 sm:order-first`}
      >
        <SearchInput
          id="adminSearch"
          name="adminSearch"
          onChange={handelSearchQuery}
          value={searchQuery}
          placeholder={searchPlaceholder}
          hiddenError
          fullWidth
          dir={dir === 'rtl' ? 'rtl' : 'ltr'}
          className="top-[0.625rem]"
        />
      </div>
      {/* This item does not work does not have service */}
      {domainFilter && (
        <Dropdown
          name="domain"
          onChange={() =>
            console.log('This dropDown functionality is not ready')
          }
          options={domainsMock}
          placeHolder={t('global.choseDomain')}
          size="sm"
        />
      )}
      {handelGroupeFilter && (
        <Dropdown
          name="group"
          onChange={handelGroupeFilter}
          options={daasGroups}
          placeHolder={t('global.grouping')}
          disabled={isLoading || error}
          size="sm"
        />
      )}

      {sortFilter && (
        <div className="order-last sm:order-none">
          <BaseDropdownIcon
            icon={PhFunnelSimple}
            options={domainFilterOptions}
            containerClassName="text-sm"
            onSelect={handelListSort}
          />
        </div>
      )}
      {buttonLabel && (
        <div className={dir === 'rtl' ? 'mr-auto' : 'ml-auto'}>
          <BaseButton
            label={buttonLabel}
            onClick={onClickButton}
            startIcon={pluse}
          />
        </div>
      )}
    </div>
  );
}
