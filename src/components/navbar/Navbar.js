import React, { useState, useEffect } from "react";
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
import { UserRegistration } from "../modal";

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
    document.getElementById("elementId").addEventListener("click", handleClick);

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
          <div className="flex flex-row gap-3 ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="font-bold pt-2"> CODE ROYALE</span>
          </div>
        </Link>

        <Command id="elementId" className="w-80">
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contest
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/problems" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Practice
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/leaderboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Leaderboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {!isLoggedIn ? (
          <UserRegistration />
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
