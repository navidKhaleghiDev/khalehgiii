import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import pluse from '@iconify-icons/ph/plus-bold';
import { BaseButton, Dropdown } from '@redesignUi/atoms';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { useLanguage } from '@context/settings/languageContext';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';

import { FilterReportsProps } from './types';
import { domainsMock } from './constants';

export default function FilterTableList(props: FilterReportsProps) {
  const {
    searchQuery,
    searchPlaceholder,
    domainFilter,
    buttonLabel,
    handelSearchQuery,
    handelGroupeFilter,
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

  const conditionOne = buttonLabel && !handelGroupeFilter && !domainFilter;

  return !conditionOne ? (
    <div className="flex items-center justify-center sm:justify-start flex-wrap sm:flex-nowrap gap-y-2.5 gap-x-[1.45rem] sm:gap-x-[1.875rem]">
      <div
        className={` ${
          buttonLabel || handelGroupeFilter
            ? 'max-w-[380px] '
            : 'w-[160px] sm:w-[360px]'
        } order-last sm:order-none`}
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
          className={`${
            buttonLabel || handelGroupeFilter ? 'w-[350px]' : 'w-[160px]'
          } sm:w-full`}
        />
      </div>
      {/* This item does not work does not have service */}
      {domainFilter ? (
        <Dropdown
          name="domain"
          onChange={() =>
            console.log('This dropDown functionality is not ready')
          }
          options={domainsMock}
          placeHolder={t('global.choseDomain')}
          size="sm"
        />
      ) : null}
      {handelGroupeFilter ? (
        <Dropdown
          name="group"
          onChange={handelGroupeFilter}
          options={daasGroups}
          placeHolder={t('global.grouping')}
          disabled={isLoading || error}
          size="sm"
        />
      ) : null}
      {buttonLabel ? (
        <div className={`${dir === 'rtl' ? 'mr-auto' : 'ml-auto'}`}>
          <BaseButton
            label={buttonLabel}
            onClick={onClickButton}
            startIcon={pluse}
          />
        </div>
      ) : null}
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <div className="w-40 sm:w-[21.87rem]">
        <SearchInput
          id="search"
          name="search"
          onChange={handelSearchQuery}
          value={searchQuery}
          placeholder={searchPlaceholder}
          hiddenError
          fullWidth
          dir={dir === 'rtl' ? 'rtl' : 'ltr'}
        />
      </div>
      <BaseButton
        label={buttonLabel}
        onClick={onClickButton}
        startIcon={pluse}
      />
    </div>
  );
}
