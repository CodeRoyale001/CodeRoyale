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
import { RootState } from "@/redux/store";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DarkLightButton from "../buttons";
import { LoginPopup } from "../popups";
import CodeRoyaleLogo from "./logo";
import { getCookie } from "@/utils/cookies";

const Navbar = () => {
  const { isLoggedIn, userName } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const userAvatarUrl= isLoggedIn?getCookie("userAvatar"):"https://github.com/shadcn.png";

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
        title: "Authentication Required",
        description: "Please log in to access this page",
      });
    }
  };

  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CodeRoyaleLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle({
                      class: pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50",
                    })}
                  >
                    <Link href={item.href} legacyBehavior passHref>
                      <Button
                        variant="ghost"
                        className="text-base"
                        onClick={() => handleNavigation(item.href)}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4 ml-4">
            {!isLoggedIn ? (
              <LoginPopup
                btntext="Login"
                btnVaraint="default"
                // className="px-6 py-2"
              />
            ) : (
              <Link href={`/u/${userName}`} className="hover:opacity-80 transition-opacity">
                <Avatar className="border-2 border-primary">
                  <AvatarImage
                    src={userAvatarUrl}
                    alt={userName}
                    className="object-cover"
                  />
                  <AvatarFallback className="font-medium">
                    {userName?.slice(0, 2).toUpperCase() ?? "US"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            <DarkLightButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <DarkLightButton />
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg"
                aria-label="Open menu"
              >
                <HamburgerMenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[340px]">
              <div className="flex flex-col h-full py-6">
                <div className="mb-8 px-4">
                  <CodeRoyaleLogo />
                </div>
                
                <div className="flex-1 flex flex-col gap-2 px-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={`justify-start text-base ${
                        pathname === item.href ? "bg-accent" : ""
                      }`}
                      onClick={() => handleNavigation(item.href)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>

                <div className="border-t pt-6 px-4">
                  {!isLoggedIn ? (
                    <LoginPopup
                      btntext="Login"
                      btnVaraint="default"
                      // className="w-full"
                    />
                  ) : (
                    <Link
                      href={`/u/${userName}`}
                      className="flex items-center gap-3 hover:bg-accent p-2 rounded-lg"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={userAvatarUrl}
                          alt={userName}
                        />
                        <AvatarFallback className="text-sm">
                          {userName?.slice(0, 2).toUpperCase() ?? "US"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{userName}</span>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
