import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

export function BaseTable(props) {
  const { header, body, onClick, className } = props;

  return (
    <table className="w-full">
      <BaseTableHeader header={header} />
      <BaseTableBody body={body} header={header} onClick={onClick} />
    </table>
  );
}
