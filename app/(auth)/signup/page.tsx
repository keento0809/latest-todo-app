import { AuthWrapper } from "../_components/authWrapper/AuthWrapper";
import { SignupForm } from "./_components/signupForm/SignupForm";

export default function Page() {
  return (
    <AuthWrapper>
      <SignupForm />
    </AuthWrapper>
  );
}
