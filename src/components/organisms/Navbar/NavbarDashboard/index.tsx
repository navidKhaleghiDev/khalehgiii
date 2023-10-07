import { Avatar } from "@ui/atoms/Avatar";
import { Typography } from "@ui/atoms/Typography/Typography";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { IconButton } from "@ui/atoms/BaseButton";
import ToolTip from "@ui/atoms/Tooltip";
import { AccessTime } from "./AccessTime";
import { useUserContext } from "@context/user/userContext";
import { http } from "@src/services/http";

export function NavbarDashboard() {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  return (
    <nav className="w-full bg-black px-8 2xl:container">
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center">
          <ToolTip tooltip="خروج" position="bottom">
            <IconButton
              icon={"ant-design:logout-outlined"}
              size="xl"
              className="ml-4 rounded-3xl"
              color="red"
              onClick={() => {
                setUser(null);
                http.removeAuthHeader();
                navigate(ROUTES_PATH.login);
              }}
            />
          </ToolTip>

          <Avatar icon="ph:user" intent="primary" size="sm" className="ml-4" />

          <div>
            <Typography type="h3" weight="bold" color="white">
              {user?.email}
            </Typography>
            <Typography color="white" size="caption">
              {user?.is_superuser ? "ادمین" : "کاربر"}
            </Typography>
          </div>

          {user ? (
            user?.is_superuser ? null : (
              <div className="mr-16">
                <AccessTime />
              </div>
            )
          ) : null}
        </div>
        {/* <Link to={ROUTES_PATH.dashboard}>
          <img src="/logo.jpg" alt="logo" className="h-8" />
        </Link> */}
      </div>
    </nav>
  );
}
