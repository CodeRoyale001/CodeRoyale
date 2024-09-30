"use client";
import { LoginPopup } from "@/components/popups";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { LockIcon } from "lucide-react";

interface LoginWarnPopupProps {
  isLoggedIn: boolean;
}

const LoginWarnPopup: React.FC<LoginWarnPopupProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <>
      <div>
        <AlertDialog defaultOpen={!isLoggedIn}>
          <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader className="space-y-3">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <LockIcon className="w-6 h-6 text-primary" />
          </div>
          <AlertDialogTitle className="text-2xl font-semibold text-center">
            Login Required
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            To access this feature, you need to be logged in. Please sign in with your account or create a new one to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => router.push("/")}>
              Back to Home
              </AlertDialogCancel>
              <LoginPopup btntext="Login / Signup" btnVaraint="default"/>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default LoginWarnPopup;
