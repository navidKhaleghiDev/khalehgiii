import { useTranslation } from 'react-i18next';

import { BaseButton } from '@redesignUi/atoms';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';
import { ToolTip } from '@redesignUi/atoms/Tooltip';
import { useLanguage } from '@context/settings/languageContext';
import pluse from '@iconify-icons/ph/plus-bold';
import GlobeSimple from '@iconify-icons/ph/globe-simple';
import caretLeft from '@iconify-icons/ph/caret-left';
import caretRight from '@iconify-icons/ph/caret-right';
import sortAscending from '@iconify-icons/ph/sort-ascending';

import { FilterReportsProps } from './types';
/**
 * FilterTableList Component.
 *
 * A utility component for filtering table data with support for search, domain filtering, sorting, and custom actions.
 *
 * @param {FilterReportsProps} props - The props for the component.
 * @param {string} props.searchQuery - The current search query text.
 * @param {string} props.searchPlaceholder - Placeholder text for the search input.
 * @param {boolean} [props.domainFilter] - If true, displays a domain filter button (currently disabled).
 * @param {string} [props.buttonLabel] - Label for the action button.
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} props.handelSearchQuery - Callback for handling search input changes.
 * @param {boolean} [props.sortFilter] - If true, displays a sort filter icon (currently disabled).
 * @param {() => void} [props.handelGroupeFilter] - Callback for handling group filter action.
 * @param {() => void} [props.onClickButton] - Callback for the action button click.
 *
 * @returns {JSX.Element} - The rendered filter table list component.
 */
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
