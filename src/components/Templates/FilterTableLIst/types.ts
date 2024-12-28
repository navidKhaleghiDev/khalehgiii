import { OptionSelect } from '@ui/atoms/BaseDropdown/type';

export interface FilterReportsProps {
  searchQuery: string;
  handelSearchQuery: (value: string) => void;
  handelGroupeFilter?: (value: OptionSelect | OptionSelect[] | null) => void;
  searchPlaceholder?: string;
  onClickButton?: () => void;
  buttonLabel?: string;
  domainFilter?: boolean;
  sortFilter?: boolean;
}
