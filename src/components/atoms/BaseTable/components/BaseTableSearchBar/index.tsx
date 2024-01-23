import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { ButtonAdd } from './components/SearchBarButtons/ButtonAdd';
import { ITableSearchButton, TComponent, TSearchBar } from './types';

function SearchComponent(componentProps: ITableSearchButton) {
  const { onClick, label, type } = componentProps;
  const components: TComponent = {
    actionAdd: <ButtonAdd onClick={onClick} label={label} />,
    typography: <h1>typography</h1>,
    actionRefresh: <h1>actionREfreah</h1>,
  };
  return components[type ?? 'typography'] || null;
}

export function BaseTableSearchBar(props: TSearchBar) {
  const { name, value, handleSearchInput, componentProps } = props;

  return (
    <div className="flex justify-between items-center">
      <SearchInput
        name={name}
        value={value}
        onChange={handleSearchInput}
        className="w-1/4"
      />
      {SearchComponent(componentProps)}
    </div>
  );
}
