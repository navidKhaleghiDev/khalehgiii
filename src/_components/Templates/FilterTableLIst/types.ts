import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';

export interface FilterReportsProps {
  searchQuery: string;
  handelSearchQuery: (value: string) => void;
  handelFilterList: (value: OptionSelect | OptionSelect[] | null) => void;
  handelListSort: (value: string) => void;
  buttonLabel?: string;
  hiddenButton?: boolean;
  hiddenGroupe?: boolean;
  hiddenSort?: boolean;
}

export const domainsMock: OptionSelect[] = [
  {
    id: '1',
    label: 'sep.npd-co.com',
    value: 'sep.npd-co.com',
  },
  {
    id: '1',
    label: 'stage.npd-co.com',
    value: 'stage.npd-co.com',
  },
  {
    id: '1',
    label: 'fence.npd-co.com',
    value: 'fence.npd-co.com',
  },
];
