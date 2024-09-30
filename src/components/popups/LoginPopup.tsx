import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogIn, Gamepad2, UserPlus } from "lucide-react";
import { SignUpForm } from "@/components/forms/signupForm";
import { LoginForm } from "@/components/forms/loginForm";

interface LoginPopupProps {
  btntext: string;
  btnVaraint: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  icon?: boolean;
  icon2?:boolean;
  classname?: string;
}

const LoginPopup: React.FC<LoginPopupProps> = ({
  btntext,
  btnVaraint,
  icon = true,
  classname = "",
  icon2 = false,
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={btnVaraint} className={classname}>
            {icon && <LogIn size="32" className="pr-2" />}
            {icon2 && 										<Gamepad2 className="mr-2 h-5 w-5" />}
            {btntext}
          </Button>
        </DialogTrigger>
        <DialogContent className="justify-center w-[350px] md:w-[500px] pt-10 md:pt-10 ">
          <Tabs defaultValue="Login" className="w-[300px] md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Login">LogIn</TabsTrigger>
              <TabsTrigger value="SignUp">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="Login">
              <Card>
                <CardHeader>
                
                  <CardTitle className="text-xl md:text-2xl font-semibold flex items-center"> <LogIn className="mr-2 h-5 w-5" />Login to your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <LoginForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="SignUp">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl font-semibold flex items-center">                 <UserPlus className="mr-2 h-5 w-5" />
                  Create a new Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SignUpForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginPopup;
