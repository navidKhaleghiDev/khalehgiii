import { NoResult } from '@ui/molecules/NoResult';
import { LicenseTableBody } from './LicenseTableBody';
import { LicenseTableHeader } from './LicenseTableHeader';

export function LicenseTables({ fileType }) {
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
