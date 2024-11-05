import { LicenseTableBody } from '@src/pages/Dashboard/License/LicenseTables/LicenseTableBody';
import { LicenseTableHeader } from '@src/pages/Dashboard/License/LicenseTables/LicenseTableHeader';
import { LicenseFileType } from '@src/pages/Dashboard/License/SettingMalwareCard/type';
import { NoResult } from '@ui/molecules/NoResult';

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
