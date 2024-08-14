import { useUserContext } from '@context/user/userContext';
import { HeadOnlineAssistantAdmin } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/HeadOnlineAssistantAdmin';
// import { HeadOnlineAssistantUser } from '@ui/organisms/Navbar/NavbarDashboard/HeadOnlineAssistant/HeadOnlineAssistantUser';

export function HeadOnlineAssistant() {
  const { user } = useUserContext();

  const isAdminGroup =
    Array.isArray(user?.admin_group_of) && user?.admin_group_of.length >= 1;

  return user?.online_assistance && isAdminGroup ? (
    <HeadOnlineAssistantAdmin onlineAssistance={user.online_assistance} />
  ) : null;
  // <HeadOnlineAssistantUser />
}
