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
