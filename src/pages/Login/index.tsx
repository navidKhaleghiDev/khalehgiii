import { withNoAuth } from '@src/helper/hoc/withNoAuth';
import { LoginSteps } from './LoginSteps';

function LoginPageCp() {
  return (
    <div className="font-kalameh flex h-screen w-full relative  ">
      <div className="lg:w-[52%] w-full h-full content-center absolute top-0 ltr:left-0 rtl:right-0  z-40 rtl:rounded-l-3xl ltr:rounded-r-3xl bg-white">
        <LoginSteps />
      </div>
      <div className="h-full w-1/2 absolute top-0 ltr:right-0 rtl:left-0">
        <img
          src="Login.jpg"
          alt="login"
          className="w-full h-full lg:block hidden object-cover"
        />
      </div>
    </div>
  );
}

const LoginPage = withNoAuth(LoginPageCp);
export { LoginPage };
