import { Avatar } from "@ui/atoms/Avatar";
import { Typography } from "@ui/atoms/Typography/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { STORAGE_KEY_USER } from "@src/services/client/users";
import { IconButton } from "@ui/atoms/BaseButton";
import { IUser } from "@src/services/client/users/types";
import ToolTip from "@ui/atoms/Tooltip";

export function NavbarDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem(STORAGE_KEY_USER) ?? ""
  ) as IUser;

  return (
    <nav className="px-8 2xl:container">
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center">
          <ToolTip tooltip="خروج" position="bottom">
            <IconButton
              icon={"ant-design:logout-outlined"}
              size="xl"
              className="ml-4 rounded-3xl"
              color="red"
              onClick={() => {
                localStorage.clear();
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
        </div>
        <Link to={ROUTES_PATH.home}>
          <img src="/logo.jpg" alt="logo" className="h-8" />
        </Link>
      </div>
    </nav>
  );
}
