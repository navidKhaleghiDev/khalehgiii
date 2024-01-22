import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { ITableSearchBar, TComponent } from './types';
import { SearchBarComponent } from './components/SearchBarComponent';

function SearchComponent({ componentProps }: ITableSearchBar) {
  const components: TComponent = {
    component: <SearchBarComponent componentProps={componentProps} />,
    typography: <h1>typography</h1>,
  };
  return components[componentProps.type ?? 'component'] || null;
}

export function BaseTableSearchBar(props: any) {
  const { name, value, handleSearchInput, componentProps } = props;

  return (
    <div className="flex justify-between items-center">
      <SearchInput
        name={name}
        value={value}
        onChange={handleSearchInput}
        className="w-1/4"
      />
      {SearchComponent({ componentProps })}
    </div>
  );
}
