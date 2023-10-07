import {
  persianDateAndNumber,
  persianDayLabel,
} from "@src/helper/utils/dateUtils";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import calendarCheckIcon from "@iconify-icons/ph/calendar-check";
import keyIcon from "@iconify-icons/ph/key";

import { ROUTES_PATH } from "@src/routes/routesConstants";

export function DashboardCards() {
  const navigate = useNavigate();

  return (
    <div className="grid w-full grid-cols-12 gap-16 mb-16">
      <div className="col-span-4">
        <Card
          icon={calendarCheckIcon}
          title={persianDayLabel()}
          description={persianDateAndNumber()}
        />
      </div>
      <div className="col-span-4">
        <Card
          icon={keyIcon}
          title="ادمین پنل keycloak"
          description=""
          onClick={() => {
            window.open(import.meta.env.VITE_KEY_CLOAK_ADMIN_PANEL, "_blank");
          }}
        />
      </div>
      <div className="col-span-4">
        <Card
          icon={keyIcon}
          title="لیست دسکتاپ ها"
          description=""
          onClick={() => navigate(ROUTES_PATH.dashboardDesktopList)}
        />
      </div>
    </div>
  );
}
