import { UsersDaAsList } from './UsersDaAsList';
import ReportsContainer from './ReportsContainer';

// Note: Remember to add the i18 title

export function ReportFileScanPage() {
  return (
    <ReportsContainer pageTitle="فایل های اسکن شده">
      <UsersDaAsList />
    </ReportsContainer>
  );
}
