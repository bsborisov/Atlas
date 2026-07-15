import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import RegisterForm from "@/features/auth/components/RegisterForm";

export default async function LoginPage() {

  return (
    <main>
        <AuthFormHeader text="Register" />
        <div className="py-4 px-8">
          <RegisterForm />
        </div>
    </main>
  );
  
}