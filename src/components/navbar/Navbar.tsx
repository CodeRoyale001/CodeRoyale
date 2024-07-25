"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticate } from "@/lib/withAuthenticate";
import { RootState } from "@/redux/store";
import { HamburgerMenuIcon, Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DarkLightButton from "../buttons";
import { LoginPopup } from "../popups";
import CodeRoyaleLogo from "./logo";

const Navbar: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navItems = [
    { name: "Contest", href: "/contests" },
    { name: "Practice", href: "/problems" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (isLoggedIn) {
      setIsDrawerOpen(false);
      router.push(href);
    } else {
      toast({
        title: "Uh Oh!",
        description:
          "Looks like you're not logged in. Please log in to continue.",
      });
    }
  };

  const NavItem = ({ name, href }: { name: string; href: string }) => (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={`${navigationMenuTriggerStyle()} cursor-pointer`}
        onClick={() => handleNavigation(href)}
      >
        {name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  return (
    <div className="bg-background text-foreground border-b h-20 w-full top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-4  gap-2 max-w-7xl mx-auto h-full">
        <Link href="/" passHref className="cursor-pointer">
          <CodeRoyaleLogo />
        </Link>

        <Command
          id="elementId"
          className="hidden md:inline-block max-w-xs lg:max-w-[400px] xl:max-w-[470px] rounded-lg border shadow-md cursor-pointer h-10"
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

        <div className="hidden md:flex items-center space-x-4 cursor-pointer">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavItem key={item.name} name={item.name} href={item.href} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {!isLoggedIn ? (
            <LoginPopup btntext="Login" btnVaraint="outline" />
          ) : (
            <Link
              href="/profile"
              legacyBehavior
              passHref
              className="cursor-pointer"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          )}
          <DarkLightButton />
        </div>

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
              <div className="p-4 pt-0  space-y-4 flex flex-col items-start justify-start mt-5 cursor-pointer">
                {!isLoggedIn ? (
                  <LoginPopup btntext="Login" btnVaraint="outline" />
                ) : (
                  <Link
                    href="/profile"
                    legacyBehavior
                    passHref
                    className="cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                )}
                <DarkLightButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default useAuthenticate(Navbar);
