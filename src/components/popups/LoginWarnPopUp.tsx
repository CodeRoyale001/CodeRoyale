"use client"
import {LoginPopup} from "@/components/popups";
import { Dialog } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
export default function LoginWarnPopup() {
return (
    <>
    <Dialog defaultOpen={true}>
        <DialogContent className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col justify-center w-1/3 p-4 rounded-lg border">
            <h6>Uh oh....</h6>
            <p>It seems you are not logged in. Please login first...</p>
            <LoginPopup btntext="Login" />
        </div>
        </DialogContent>
    </Dialog>
    </>
);
}

