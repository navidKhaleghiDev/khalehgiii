import { NoResult } from '@ui/molecules/NoResult';
import { LicenseTableBody } from './LicenseTableBody';
import { LicenseTableHeader } from './LicenseTableHeader';
import { LicenseFileType } from '../../SettingsMalware/type';

interface LicenseTablesProps {
  fileType: LicenseFileType[];
}
export function LicenseTables({ fileType }: LicenseTablesProps) {
  return (
    <div>
      <LicenseTableHeader />
      {fileType.length >= 1 ? (
        fileType.map((item) => (
          <LicenseTableBody key={item.number} item={item} />
        ))
      ) : (
        <NoResult />
      )}
    </div>
  );
}
