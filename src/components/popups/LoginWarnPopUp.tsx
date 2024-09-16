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
            <AlertDialogHeader>
              <AlertDialogTitle>Attention Required</AlertDialogTitle>
              <AlertDialogDescription>
                You need to log in or sign up to access this feature. Please log
                in with your credentials or create an account to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => router.push("/")}>
                Cancel
              </AlertDialogCancel>
              <LoginPopup btntext="Login / Signup" btnVaraint="default" />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default LoginWarnPopup;
