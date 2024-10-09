import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

export function BaseTable(props) {
  const { header, body } = props;

  return (
    <table>
      <BaseTableHeader header={header} />
      <BaseTableBody body={body} />
    </table>
  );
}
