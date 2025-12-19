import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-200">
      <div className="w-full max-w-sm animate-fade-in">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
