import { useState } from 'react';
import { Avatar } from '@ui/atoms';
import userIcon from '@iconify-icons/ph/user';
import { LoginForm } from '../LoginForm';
import LogInOtpForm from '../LoginOtpForm';

export function LoginSteps() {
  const [isOtpActive, setIsOtpActive] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center w-full mt-auto">
      <div className="absolute top-[-6rem]">
        <Avatar icon={userIcon} intent="grey" size="lg" />
      </div>
      {!isOtpActive ? (
        <LoginForm setIsOtpActive={setIsOtpActive} />
      ) : (
        <LogInOtpForm setIsOtpActive={setIsOtpActive} />
      )}
    </div>
  );
}
