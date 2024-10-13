import { ComponentCell } from '@ui/atoms/BaseTable/components/CustomCell/ComponentCell';
import { IconButton } from '@ui/atoms/BaseButton';
import PhCaretDownBold from '@iconify-icons/ph/caret-down-bold';
import PhCaretUpBold from '@iconify-icons/ph/caret-up-bold';
import { BaseTableNoneCell } from './BaseTableRowCells/BaseTableNoneCell';

export function BaseTableRow({ row, header, onClick, isOpen, toggleRowOpen }) {
  const id = header?.id;

  const Components = {
    none: <BaseTableNoneCell row={row} id={id} header={header} />,
    component: (
      <ComponentCell row={row} header={header} id={id} onClick={onClick} />
    ),
    drop: (
      <IconButton
        icon={isOpen ? PhCaretUpBold : PhCaretDownBold}
        onClick={() => toggleRowOpen(row.id)}
      />
    ),
  };

  return (
    <div className={`${header.class}`}>
      <tr>
        <td>{Components[header?.type ?? 'none']}</td>
      </tr>
      {isOpen && header?.component && (
        <tr>
          <td colSpan={header.length}>
            <div
              aria-label={header.id}
              className="h-16 w-full bg-gray-400 transition duration-150 ease-in-out"
            >
              <header.component row={row} header={header} onClick={onClick} />
            </div>
          </td>
        </tr>
      )}
    </div>
  );
}
