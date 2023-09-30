import { Avatar } from "@ui/atoms/Avatar";
import { Typography } from "@ui/atoms/Typography/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { IconButton } from "@ui/atoms/BaseButton";
import ToolTip from "@ui/atoms/Tooltip";
import { AccessTime } from "./AccessTime";
import { useUserContext } from "@context/user/userContext";
import { http } from "@src/services/http";

export function NavbarDashboard() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  return (
    <nav className="w-full px-8 2xl:container">
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center">
          <ToolTip tooltip="خروج" position="bottom">
            <IconButton
              icon={"ant-design:logout-outlined"}
              size="xl"
              className="ml-4 rounded-3xl"
              color="red"
              onClick={() => {
                http.removeAuthHeader();
                navigate(ROUTES_PATH.login);
              }}
            />
          </ToolTip>

          <Avatar icon="ph:user" intent="primary" size="sm" className="ml-4" />

          <div>
            <Typography type="h3" weight="bold" color="teal">
              {user?.email}
            </Typography>
            <Typography color="teal" size="caption">
              {user?.is_admin ? "ادمین" : "کاربر"}
            </Typography>
          </div>

          {user?.is_admin && (
            <div className="mr-16">
              <AccessTime />
            </div>
          )}
        </div>
        <Link to={ROUTES_PATH.dashboard}>
          <img src="/logo.jpg" alt="logo" className="h-8" />
        </Link>
      </div>
    </nav>
  );
}
