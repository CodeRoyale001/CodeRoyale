// Navbar.tsx

"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import CodeRoyaleLogo from "./logo";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useSelector } from "react-redux";
import {  RootState } from "@/redux/store";
import { LoginPopup } from "../popups";
import DarkLightButton from "../buttons";
import { useAuthenticate } from "@/lib/withAuthenticate";

const Navbar: React.FC = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
	const { toast } = useToast();
	const [open, setOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	return (
		<>
			<div className="h-1/6 navbar-container flex flex-row gap-10 justify-between  p-5 pl-10 pr-44 bg-background text-foreground border-b">
				<Link href="/" legacyBehavior passHref>
					<div className="flex flex-row gap-10 cursor-pointer">
						<div className="relative w-44 h-10 rounded-lg mr-24">
							<CodeRoyaleLogo />
						</div>
					</div>
				</Link>

				<Command
					id="elementId"
					className="w-100 rounded-lg border shadow-md cursor-pointer"
				>
					<CommandInput
						placeholder="Type a command or search..."
						className="cursor-pointer"
					/>
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

				<NavigationMenu className="gap-4 pl-16">
					<NavigationMenuList>
						<NavigationMenuItem className="px-2">
							{isLoggedIn ? (
								<Link href="/contests" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										Contest
									</NavigationMenuLink>
								</Link>
							) : (
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} cursor-pointer`}
									onClick={() =>
										toast({
											title: "Uh Ohh!",
											description:
												"Looks like you're not logged in. Please log in to continue.",
										})
									}
								>
									Contest
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>

						<NavigationMenuItem className="px-2">
							{isLoggedIn ? (
								<Link href="/problems" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										Practice
									</NavigationMenuLink>
								</Link>
							) : (
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} cursor-pointer`}
									onClick={() =>
										toast({
											title: "Uh Ohh!",
											description:
												"Looks like you're not logged in. Please log in to continue.",
										})
									}
								>
									Practice
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>

						<NavigationMenuItem className="px-2">
							{isLoggedIn ? (
								<Link
									href="/leaderboard"
									legacyBehavior
									passHref
								>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										Leaderboard
									</NavigationMenuLink>
								</Link>
							) : (
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} cursor-pointer`}
									onClick={() =>
										toast({
											title: "Uh Ohh!",
											description:
												"Looks like you're not logged in. Please log in to continue.",
										})
									}
								>
									Leaderboard
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{!isLoggedIn ? (
					<>
						<LoginPopup btntext="Login / SignUp" btnVaraint="outline" />
					</>
				) : (
					<Link href="/profile" legacyBehavior passHref>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Link>
				)}
				<div className="absolute right-5 top-5">
					<DarkLightButton />
				</div>
			</div>
		</>
	);
};

export default useAuthenticate(Navbar);
