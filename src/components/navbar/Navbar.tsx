"use client";
import React, { useState, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
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
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import LoginPopup from "../popups";
import DarkLightButton from "../buttons";
import { getCookie } from "@/utils/cookies";
import { login, logout } from "@/redux/slice";
import { getNewAccessToken } from "@/utils/api";



const Navbar: React.FC = () => {

	const dispatch = useDispatch<AppDispatch>();
	const { isLoggedIn } = useSelector(
		(state: RootState) => state.user
	  );
	const [open, setOpen] = useState<boolean>(false);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	useEffect(() => {
		const autoAuthenticate = async () => {
			const refreshToken = getCookie('refreshToken');
			if (refreshToken) {
			  const accessToken = await getNewAccessToken(refreshToken);
			  if (accessToken) {
				dispatch(login());
			  } else {
				dispatch(logout());
			  }
			}
		  };
		  autoAuthenticate();
		const handleKeyPress = (e: Event) => {
			const keyboardEvent = e as unknown as KeyboardEvent;
			if ((keyboardEvent.key === 'j' || keyboardEvent.key === 'J') && (keyboardEvent.metaKey || keyboardEvent.ctrlKey)) {
				e.preventDefault();
				toggleOpen();
			}
		};

		const handleClick = () => {
			toggleOpen();
		};

		document.addEventListener('keydown', handleKeyPress);
		const element = document.getElementById('elementId');
		element?.addEventListener('click', handleClick);
	
		return () => {
		  document.removeEventListener('keydown', handleKeyPress);
		  element?.removeEventListener('click', handleClick);
		};
	  }, []);
	

	return (
		<>
			<div className="navbar-container flex flex-row gap-10 justify-between p-5 bg-background text-foreground border-b">
				<Link href="/" legacyBehavior passHref>
					<div className="flex flex-row gap-10">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span>CODE ROYALE</span>
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

				{isLoggedIn?(<NavigationMenu className="gap-5">
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
				</NavigationMenu>):null
}

				{!isLoggedIn ? (
					<LoginPopup btntext="Login / SignUp" />
				) : (
					<Link href="/profile" legacyBehavior passHref>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</Link>
				)}

				<DarkLightButton />
			</div>
		</>
	);
};

export default Navbar;
