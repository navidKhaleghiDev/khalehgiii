import { Typography } from '@redesignUi/atoms';
import usersThreeIcon from '@iconify-icons/ph/users-three';

import { Card } from '../Dashboard/DashboardCards/Card';

type ReportsContainerProp = {
  pageTitle: string;
};

// Note : dashBoard card is not ready (pending)

export default function ReportsContainer({ pageTitle }: ReportsContainerProp) {
  return (
    <>
      <Typography color="black" variant="body2B">
        {pageTitle}
      </Typography>
      <div className="flex items-center gap-[1.875] mt-9">
        <Card icon={usersThreeIcon} title="اسکن های امروز" description="" />
        <Card icon={usersThreeIcon} title="ماربران آنلاین" description="" />
      </div>
    </>
  );
}
