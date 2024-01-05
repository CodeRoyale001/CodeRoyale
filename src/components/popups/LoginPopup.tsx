import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { postRequest } from '@/utils/api';
import { ToastAction } from '@/components/ui/toast';
import { toast } from 'sonner';

interface LoginPopupProps {
  btntext: string;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ btntext }) => {
  const handleLogin = async () => {
    const username = (document.getElementById('name') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Basic Frontend Validation
    if (!username || !password) {
      toast('Please fill in both fields.');
      return;
    }

    // Prepare data for API request
    const loginData = {
      username,
      password,
    };
    console.log(loginData);

    // Call API
    try {
      await postRequest('/api/login', loginData, '', (response) => {
        // Handle success - maybe set a token, redirect, etc.
        toast({
          description: 'Login Successful',
        });
        console.log('Login Successful:', response);
      });
    } catch (error) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: (
          <ToastAction altText='Try again'>Try again</ToastAction>
        ),
      });
      console.error('Login Failed:', error);
      // Handle login failure
    }
  };

  const handleSignup = () => {
    // Signup logic here
  };

  return (
    <>
			<Dialog className="w-[450px]">
				<DialogTrigger asChild>
					<Button variant="outline">{btntext}</Button>
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
									<div className="space-y-1">
										<Label htmlFor="username">
											Username / Email id
										</Label>
										<Input
											id="name"
											placeholder="Enter your Email"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="password">
											Password
										</Label>
										<Input
											id="password"
											type="password"
											placeholder="Enter your Password"
										/>
									</div>
								</CardContent>
								<CardFooter className="justify-center">
									<Button
										className="w-full"
										onClick={handleLogin}
									>
										Log In
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="SignUp">
							<Card>
								<CardHeader>
									<CardTitle>Create a new Account</CardTitle>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="space-y-1">
										<Label htmlFor="username">
											Username
										</Label>
										<Input
											id="username"
											placeholder="Enter your Username"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="email">Email id</Label>
										<Input
											id="email"
											placeholder="Enter your Email"
											type="email"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="current">
											Password
										</Label>
										<Input
											id="current"
											type="password"
											placeholder="Enter your Password"
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="new">
											Re-Enter password
										</Label>
										<Input
											id="new"
											type="password"
											placeholder="Re-Enter your Password"
										/>
									</div>
								</CardContent>
								<CardFooter className="justify-center">
									<Button
										className="w-full"
										onClick={handleSignup}
									>
										Sign Up
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				</DialogContent>
			</Dialog>
    </>
  );
};

export default LoginPopup;
