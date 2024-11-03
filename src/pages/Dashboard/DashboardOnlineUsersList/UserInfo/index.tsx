import { Avatar, Typography } from '@redesignUi/atoms';
import User from '@iconify-icons/ph/user';

interface UserInfoProps {
  fullName: string;
  email: string;
}

export function UserInfo({ fullName, email }: UserInfoProps) {
  return (
    <div className="flex gap-3 pb-5">
      <Avatar icon={User} size="md" />
      <div>
        <Typography color="neutralDark" variant="body5">
          {fullName}
        </Typography>
        <Typography color="neutralMiddle" variant="body6">
          {email}
        </Typography>
      </div>
    </div>
  );
}
