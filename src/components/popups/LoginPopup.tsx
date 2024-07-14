import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Login } from "iconic-react";
import { SignUpForm } from "@/components/forms/signupForm";
import { LoginForm } from "@/components/forms/loginForm";

interface LoginPopupProps {
	btntext: string;
	btnVaraint: any;
	icon?: boolean;
	classname?: string;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ btntext, btnVaraint, icon = true, classname = '' }) => {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant={btnVaraint} className={classname}>
						{ icon && <Login size="32" className="pr-2" /> }
						{btntext}
					</Button>
				</DialogTrigger>
				<DialogContent className="justify-center pt-10 w-[475px]">
					<Tabs defaultValue="Login" className="w-[400px]">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="Login">LogIn</TabsTrigger>
							<TabsTrigger value="SignUp">SignUp</TabsTrigger>
						</TabsList>
						<TabsContent value="Login">
							<Card>
								<CardHeader>
									<CardTitle>Login to your Account</CardTitle>
								</CardHeader>
								<CardContent className="space-y-2">
									<LoginForm />
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="SignUp">
							<Card>
								<CardHeader>
									<CardTitle>Create a new Account</CardTitle>
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