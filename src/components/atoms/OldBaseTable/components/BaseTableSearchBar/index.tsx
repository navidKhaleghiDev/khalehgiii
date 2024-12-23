import { ResetAllAccessTime } from '@src/pages/UserManagement/UserListPage/DaAsList/ResetAllAccessTime';
import { Typography } from '@ui/atoms/Typography';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';

import { ButtonAdd } from './components/SearchBarButtons/ButtonAdd';
import {
  TableSearchComponentProps,
  ComponentParams,
  SearchBarParams,
} from './types';

function SearchComponent(componentProps: TableSearchComponentProps) {
  const { onClick, label = '', type, className } = componentProps || {};
  const components: ComponentParams = {
    actionAdd: <ButtonAdd onClick={onClick} label={label} />,
    typography: (
      <Typography variant="h4" color="teal" className={className}>
        {label}
      </Typography>
    ),
    actionRefresh: <ResetAllAccessTime />,
  };
  return components[type ?? 'typography'] || null;
}

export function BaseTableSearchBar(props: SearchBarParams) {
  const { name, value, handleSearchInput, componentProps } = props;

  return (
    <div className="flex justify-between items-center">
      <SearchInput
        id={name}
        name={name}
        value={value}
        onChange={handleSearchInput}
        className="w-1/4"
      />
      {componentProps && SearchComponent(componentProps)}
    </div>
  );
}
