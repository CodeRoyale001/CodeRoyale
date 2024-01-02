import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Pencil2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	Command,
	CommandInput,
	CommandDialog,
	CommandList,
	CommandEmpty,
	CommandItem,
	CommandGroup,
} from "@/components/ui/command";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	useEffect(() => {
		const handleKeyPress = (e) => {
			if ((e.key === "j" || e.key === "J") && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				toggleOpen();
			}
		};

		const handleClick = () => {
			toggleOpen();
		};

		document.addEventListener("keydown", handleKeyPress);
		document
			.getElementById("elementId")
			.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
			document
				.getElementById("elementId")
				.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<>
			<div className=" navbar-container flex flex-row gap-10 justify-between p-5 bg-background text-foreground border-b">
				<Link href="/" legacyBehavior passHref>
					<div className="flex flex-row gap-10">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span> CODE ROYALE</span>
					</div>
				</Link>

				<Command id="elementId" className="w-100">
					<CommandInput placeholder="Type a command or search..." />
				</Command>

				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput placeholder="Search a problem or contest..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions">
							<CommandItem>
								<Pencil2Icon className="mr-2 h-4 w-4" />

								<span>Problem 1</span>
							</CommandItem>
							<CommandItem>
								<Pencil2Icon className="mr-2 h-4 w-4" />

								<span>Contest 1</span>
							</CommandItem>
							<CommandItem>
								<Pencil2Icon className="mr-2 h-4 w-4" />
								<span>Problem 6</span>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</CommandDialog>

				<NavigationMenu className="gap-5">
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/contests" legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Contest
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/problems" legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Practice
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/leaderboard" legacyBehavior passHref>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
								>
									Leaderboard
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{!isLoggedIn ? (
					<Dialog className="w-[450px]">
						<DialogTrigger asChild>
							<Button variant="outline">Login / SignUp</Button>
						</DialogTrigger>
						<DialogContent className="justify-center pt-10 w-[475px]">
							<Tabs defaultValue="Login" className="w-[400px]">
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger value="Login">
										LogIn
									</TabsTrigger>
									<TabsTrigger value="SignUp">
										SignUp
									</TabsTrigger>
								</TabsList>
								<TabsContent value="Login">
									<Card>
										<CardHeader>
											<CardTitle>
												Login to your Account
											</CardTitle>
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
											<Button className="w-full">Log In</Button>
										</CardFooter>
									</Card>
								</TabsContent>
								<TabsContent value="SignUp">
									<Card>
										<CardHeader>
											<CardTitle>
												Create a new Account
											</CardTitle>
										</CardHeader>
										<CardContent className="space-y-2">
										<div className="space-y-1">
												<Label htmlFor="username">
													Username
												</Label>
												<Input
													id="name"
													placeholder="Enter your Username"
												/>
											</div>
											<div className="space-y-1">
												<Label htmlFor="email">
													Email id
												</Label>
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
											<Button className="w-full">Sign Up</Button>
										</CardFooter>
									</Card>
								</TabsContent>
							</Tabs>
						</DialogContent>
					</Dialog>
				) : (
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				)}
			</div>
		</>
	);
};

export default Navbar;
