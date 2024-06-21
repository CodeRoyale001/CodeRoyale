"use client";
import React, { useState, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import CodeRoyaleLogo from "./logo";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoginPopup from "../popups";
import DarkLightButton from "../buttons";
import { getCookie } from "@/utils/cookies";
import { login, logout } from "@/redux/slice";
import { getNewAccessToken } from "@/utils/api";
import { isTokenExpired } from "@/utils/tokens";

const Loader = () => <div className="loader">Loading...</div>;

const Navbar: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
	const [open, setOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	useEffect(() => {
		const autoAuthenticate = async () => {
			setIsLoading(true); // Start loading
			const accessToken = getCookie("accessToken");
			const refreshToken = getCookie("refreshToken");

			if (accessToken && !isTokenExpired(accessToken)) {
				const userName = getCookie("userName");
				dispatch(login(userName));
			} else if (refreshToken) {
				const response = await getNewAccessToken(refreshToken);
				console.log(response);

				if (response?.accessToken) {
					dispatch(login(response.userName));
				} else {
					alert("Auto Login Failed");
				}
			}

			setIsLoading(false); // End loading
		};
		autoAuthenticate();

		const handleKeyPress = (e: Event) => {
			const keyboardEvent = e as unknown as KeyboardEvent;
			if (
				(keyboardEvent.key === "j" || keyboardEvent.key === "J") &&
				(keyboardEvent.metaKey || keyboardEvent.ctrlKey)
			) {
				e.preventDefault();
				toggleOpen();
			}
		};

		const handleClick = () => {
			toggleOpen();
		};

		document.addEventListener("keydown", handleKeyPress);
		const element = document.getElementById("elementId");
		element?.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
			element?.removeEventListener("click", handleClick);
		};
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

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

				<Command id="elementId" className="w-100 rounded-lg border shadow-md">
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

				{isLoggedIn ? (
					<NavigationMenu className="gap-4 pl-16">
						<NavigationMenuList>
							<NavigationMenuItem className="px-2">
								<Link href="/contests" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										Contest
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem className="px-2">
								<Link href="/problems" legacyBehavior passHref>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										Practice
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<NavigationMenuItem className="px-2">
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
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				) : null}

				{!isLoggedIn ? (
					<>
						<LoginPopup btntext="Login / SignUp" />
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

export default Navbar;
