import { AuthWrapper } from "../_components/authWrapper/AuthWrapper";
import { SigninForm } from "./_components/signinForm/SigninForm";

export default function Page() {
  return (
    <AuthWrapper>
      <SigninForm />
    </AuthWrapper>
  );
}
