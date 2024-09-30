"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DarkLightButton from "../buttons";
import { LoginPopup } from "../popups";
import CodeRoyaleLogo from "./logo";

const Navbar: React.FC = () => {
  const { isLoggedIn, userName } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
        className={`${navigationMenuTriggerStyle()} cursor-pointer transition-colors duration-200 ${
          pathname === href ? 'bg-accent text-accent-foreground' : ''
        }`}
        onClick={() => handleNavigation(href)}
      >
        {name}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

  return (
    <div className="bg-background text-card-foreground top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 gap-2 max-w-7xl mx-auto h-20">
        <Link href="/" passHref className="cursor-pointer">
          <CodeRoyaleLogo />
        </Link>

        <div className="hidden md:flex items-center space-x-4 cursor-pointer">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavItem key={item.name} name={item.name} href={item.href} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {!isLoggedIn ? (
            <LoginPopup btntext="Login" btnVaraint="default" />
          ) : (
            <Link
              href={`/u/${userName}`}
              legacyBehavior
              passHref
              className="cursor-pointer"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          )}
          <DarkLightButton />
        </div>

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <HamburgerMenuIcon className="h-6 w-6 transition-transform duration-200" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={`justify-start text-lg transition-colors duration-200 ${
                      pathname === item.href ? 'bg-accent text-accent-foreground' : ''
                    }`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
              <div className="mt-auto p-4 space-y-4 flex flex-col items-start">
                {!isLoggedIn ? (
                  <LoginPopup btntext="Login" btnVaraint="default" />
                ) : (
                  <Link href={`/u/${userName}`} className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                      <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{userName}</span>
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
