import { useUserContext } from '@context/user/userContext';
import { HeadOnlineAssistantAdmin } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/HeadOnlineAssistantAdmin';
import { HeadOnlineAssistantUser } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/HeadOnlineAssistantUser';

type THeadOnlineAssistantProps = {
  logout: () => void;
};

export function HeadOnlineAssistant({ logout }: THeadOnlineAssistantProps) {
  const { user } = useUserContext();

  const isAdminGroup =
    Array.isArray(user?.admin_group_of) && user?.admin_group_of.length >= 1;

  return user?.online_assistance && isAdminGroup ? (
    <HeadOnlineAssistantAdmin
      onlineAssistance={user.online_assistance}
      logout={logout}
    />
  ) : (
    <HeadOnlineAssistantUser />
  );
}
