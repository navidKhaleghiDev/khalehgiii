import { Typography } from '@redesignUi/atoms';
import usersThreeIcon from '@iconify-icons/ph/users-three';

import { Card } from '../Dashboard/DashboardCards/Card';
import FilterReports from './FilterReports';

type ReportsContainerProp = {
  pageTitle: string;
  children: React.ReactNode;
};

// Note : dashBoard card is not ready (pending)
// Note : add i18 to the components

export default function ReportsContainer({
  pageTitle,
  children,
}: ReportsContainerProp) {
  return (
    <>
      <Typography color="black" variant="body2B">
        {pageTitle}
      </Typography>
      <div className="flex items-center gap-[1.875] mt-9 max-w-[700px]">
        <Card icon={usersThreeIcon} title="اسکن های امروز" description="" />
        <Card icon={usersThreeIcon} title="کاربران آنلاین" description="" />
      </div>
      <FilterReports />
      {children}
    </>
  );
}
