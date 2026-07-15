import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import LoginForm from "@/features/auth/components/LoginForm";

export default async function LoginPage() {

  return (
    <main>
        <AuthFormHeader text="Log in" />
        <div className="py-4 px-8">
          <LoginForm />
        </div>
    </main>
  );
  
}