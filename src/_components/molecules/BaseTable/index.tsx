import { LoadingSpinner } from '@ui/molecules/Loading';
import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

export function BaseTable(props) {
  const { header, body, onClick, className, loading } = props;

  console.log(body);

  return (
    <table className="w-full ">
      <BaseTableHeader header={header} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <BaseTableBody body={body} header={header} onClick={onClick} />
      )}
    </table>
  );
}
