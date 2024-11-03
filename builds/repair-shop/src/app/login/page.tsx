import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
function LoginPage() {
  return (
    <main className="h-dvh flex flex-col gap-6 items-center text-4xl p-4">
      <h1 className="">Computer Repair Shop</h1>
      <Button asChild>
        <LoginLink>Sign In</LoginLink>
      </Button>
    </main>
  );
}
export default LoginPage;
