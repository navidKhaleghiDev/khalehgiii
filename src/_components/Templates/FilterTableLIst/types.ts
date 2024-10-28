import { t } from 'i18next';

import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';

export interface FilterReportsProps {
  searchQuery: string;
  handelSearchQuery: (value: string) => void;
  handelGroupeFilter?: (value: OptionSelect | OptionSelect[] | null) => void;
  handelListSort?: (value: string) => void;
  searchPlaceholder?: string;
  onClickButton?: () => void;
  buttonLabel?: string;
  sortFilter?: boolean;
  domainFilter?: boolean;
}

export const domainsMock: OptionSelect[] = [
  {
    id: '1',
    label: 'sep.npd-co.com',
    value: 'sep.npd-co.com',
  },
  {
    id: '2',
    label: 'stage.npd-co.com',
    value: 'stage.npd-co.com',
  },
  {
    id: '3',
    label: 'fence.npd-co.com',
    value: 'fence.npd-co.com',
  },
];

export const domainFilterOptions = [
  { id: '1', value: 'alphabetic', label: t('global.alphabet') },
  { id: '2', value: 'date', label: t('global.creationDate') },
  { id: '3', value: 'newest', label: t('global.newest') },
];
