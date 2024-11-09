import { useTranslation } from 'react-i18next';

import { BaseButton } from '@redesignUi/atoms';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { useLanguage } from '@context/settings/languageContext';
import pluse from '@iconify-icons/ph/plus-bold';
import GlobeSimple from '@iconify-icons/ph/globe-simple';
import caretLeft from '@iconify-icons/ph/caret-left';
import caretRight from '@iconify-icons/ph/caret-right';
import sortAscending from '@iconify-icons/ph/sort-ascending';
import PhUsersThree from '@iconify-icons/ph/users-three';

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

  // This functionality does not work cause we do not have service call
  // const { data, isLoading, error } = useSWR<IResponseData<TGroup[]>>(
  //   E_USERS_GROUPS,
  //   http.fetcherSWR
  // );
  // const daasGroups: OptionSelect[] = useMemo(
  //   () =>
  //     data?.data.map((item) => ({
  //       id: String(item.id),
  //       label: item.name,
  //       value: item.name,
  //     })) ?? [],
  //   [data]
  // );

  const conditionOne = buttonLabel && !handelGroupeFilter && !domainFilter;
  const isFarsi = dir === 'rtl';
  const caret = isFarsi ? caretLeft : caretRight;

  return !conditionOne ? (
    <div className="flex items-center sm:justify-start flex-wrap sm:flex-nowrap gap-y-2.5 gap-x-[1.45rem] sm:gap-x-[1.875rem]">
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
      ) : null}
      {handelGroupeFilter ? (
        <div>
          <BaseButton
            label={t('global.grouping')}
            endIcon={caret}
            type="neutral"
            className="sm:flex hidden w-40"
            disabled
          />
          <IconButton
            icon={PhUsersThree}
            color="neutral"
            className="sm:hidden flex"
            disabled
          />
        </div>
      ) : null}
      {sortFilter ? (
        <IconButton
          icon={sortAscending}
          color="neutral"
          className="sm:hidden flex"
          disabled
        />
      ) : null}
      {buttonLabel ? (
        <div className={`${dir === 'rtl' ? 'sm:mr-auto' : 'sm::ml-auto'}`}>
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
          dir={dir === 'rtl' ? 'rtl' : 'ltr'}
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
