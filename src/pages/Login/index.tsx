import { Card } from "@ui/atoms/Card";
import { withNoAuth } from "@src/helper/hoc/withNoAuth";
import { LoginForm } from "./LoginForm";

function LoginPageCp() {
  return (
    <div className="font-on bg-teal-600  flex flex-col items-center justify-center min-h-screen ">
      <Card className="relative p-10 w-[29.375rem] h-[33rem] flex flex-col items-center">
        <LoginForm />
      </Card>
    </div>
  );
}

const LoginPage = withNoAuth(LoginPageCp);
export { LoginPage };
