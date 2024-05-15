import { Card } from '@ui/atoms/Card';
import { withNoAuth } from '@src/helper/hoc/withNoAuth';
import { LoginSteps } from './LoginSteps';

function LoginPageCp() {
  return (
    <div className="font-on bg-teal-600 dark:bg-slate-900 flex flex-col items-center justify-center min-h-screen ">
      <Card
        color="white"
        className="relative p-10 w-[29.375rem] h-[33rem] flex flex-col items-center "
      >
        <LoginSteps />
      </Card>
    </div>
  );
}

const LoginPage = withNoAuth(LoginPageCp);
export { LoginPage };
