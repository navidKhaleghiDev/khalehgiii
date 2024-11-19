import { useTranslation } from 'react-i18next';

import { BaseButton, Dropdown } from '@redesignUi/atoms';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { ToolTip } from '@redesignUi/atoms/Tooltip';
import { useLanguage } from '@context/settings/languageContext';
import pluse from '@iconify-icons/ph/plus-bold';
import GlobeSimple from '@iconify-icons/ph/globe-simple';
import caretLeft from '@iconify-icons/ph/caret-left';
import caretRight from '@iconify-icons/ph/caret-right';
import PhUsersThree from '@iconify-icons/ph/users-three';
import sortAscending from '@iconify-icons/ph/sort-ascending';

import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { useMemo } from 'react';
import useSWR from 'swr';
import { TGroup } from '@src/services/users/types';
import { IResponseData } from '@src/types/services';
import { E_USERS_GROUPS } from '@src/services/users/endpoint';
import { http } from '@src/services/http';

import { FilterReportsProps } from './types';

export function FilterTableList(props: FilterReportsProps) {
  const {
    searchQuery,
    searchPlaceholder,
    domainFilter,
    buttonLabel,
    handelSearchQuery,
    sortFilter,
    handelGroupeFilter,
    onClickButton,
  } = props;

  const { t } = useTranslation();
  const { dir } = useLanguage();

  const { data } = useSWR<IResponseData<TGroup[]>>(
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
  const isFarsi = dir === 'rtl';
  const caret = isFarsi ? caretLeft : caretRight;

  return !conditionOne ? (
    <div className="flex items-center sm:justify-start flex-wrap sm:flex-nowrap gap-y-2.5 gap-x-[1rem] sm:gap-x-[1.875rem]">
      <div
        className={` ${
          buttonLabel || handelGroupeFilter
            ? 'w-full sm:max-w-[22.5rem]'
            : 'w-40 sm:w-[22.5rem]'
        } order-last w-full sm:order-none`}
      >
        <SearchInput
          id="adminSearch"
          name="adminSearch"
          onChange={handelSearchQuery}
          value={searchQuery}
          placeholder={searchPlaceholder}
          hiddenError
          fullWidth
          dir={isFarsi ? 'rtl' : 'ltr'}
          className={`${
            buttonLabel || handelGroupeFilter ? 'w-[21.875rem]' : 'w-40'
          } w-full`}
        />
      </div>
      {/* This item does not work does not have service */}
      {domainFilter ? (
        <ToolTip tooltip={t('global.Developing')} position="top">
          <div>
            <BaseButton
              label={t('global.choseDomain')}
              endIcon={caret}
              type="neutral"
              className="sm:flex hidden w-[160px]"
              disabled
            />
            <IconButton
              icon={GlobeSimple}
              color="neutral"
              className="sm:hidden flex"
              disabled
            />
          </div>
        </ToolTip>
      ) : null}
      {/* This item does not work does not have service */}
      {handelGroupeFilter ? (
        <div>
          <Dropdown
            // endIcon={caret}
            // type="neutral"
            placeHolder={t('global.grouping')}
            onChange={handelGroupeFilter}
            options={daasGroups}
            name="groupFilter"
            size="sm"
          />
          <IconButton
            icon={PhUsersThree}
            color="neutral"
            className="sm:hidden flex"
            disabled
          />
        </div>
      ) : null}
      {/* This item does not work does not have service */}
      {sortFilter ? (
        <IconButton
          icon={sortAscending}
          color="neutral"
          className="sm:hidden flex"
          disabled
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
    <div className="flex items-center justify-between gap-[1.875rem]">
      <div className="w-full sm:w-[21.87rem]">
        <SearchInput
          id="search"
          name="search"
          onChange={handelSearchQuery}
          value={searchQuery}
          placeholder={searchPlaceholder}
          hiddenError
          fullWidth
          dir={isFarsi ? 'rtl' : 'ltr'}
        />
      </div>
      <div className="w-40">
        <BaseButton
          label={buttonLabel}
          onClick={onClickButton}
          startIcon={pluse}
        />
      </div>
    </div>
  );
}
