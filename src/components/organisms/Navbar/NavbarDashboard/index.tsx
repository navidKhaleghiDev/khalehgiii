import { Avatar } from "@ui/atoms/Avatar";
import { Typography } from "@ui/atoms/Typography/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "@src/routes/routesConstants";
import { IconButton } from "@ui/atoms/BaseButton";
import ToolTip from "@ui/atoms/Tooltip";
import userIcon from "@iconify-icons/ph/user";
import signOutBoldIcon from "@iconify-icons/ph/sign-out-bold";
import gearIcon from "@iconify-icons/ph/gear";

import { AccessTime } from "./AccessTime";
import { useUserContext } from "@context/user/userContext";
import { http } from "@src/services/http";
import { Modal } from "@ui/molecules/Modal";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { useState } from "react";

export function NavbarDashboard() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { user, setUser } = useUserContext();

  const logout = () => {
    setUser(null);
    http.removeAuthHeader();
    navigate(ROUTES_PATH.login);
  };

  return (
    <nav className="w-full bg-black px-8 2xl:container">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <ToolTip tooltip="خروج" position="bottom">
            <IconButton
              icon={signOutBoldIcon}
              size="xl"
              className="ml-4 rounded-3xl"
              color="red"
              onClick={logout}
            />
          </ToolTip>

          {user?.is_superuser && (
            <ToolTip tooltip="تنظیمات" position="bottom">
              <IconButton
                icon={gearIcon}
                size="xl"
                className="ml-4 rounded-3xl"
                color="teal"
                onClick={() => setOpenModal(true)}
              />
            </ToolTip>
          )}

          <Avatar icon={userIcon} intent="primary" size="sm" className="ml-4" />

          <div>
            <Typography weight="bold" color="white" size="caption">
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

        <div className="flex">
          {/* <NavigationButtons /> */}
          <Link to={ROUTES_PATH.dashboard}>
            <img src="/logo.png" alt="logo" className="h-8" />
          </Link>
        </div>
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        title="تغیر نام کاربری و گذرواژه"
        content={<ChangePasswordForm user={user} logout={logout} />}
        type="success"
      />
    </nav>
  );
}
