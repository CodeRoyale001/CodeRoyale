import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { Signup, Login } from "../modal";

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
          <Dialog className="w-[450px]">
            <DialogTrigger asChild>
              <Button variant="outline">Login / SignUp</Button>
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
                        <Label htmlFor="username " className="flex gap-1">
                          Username / Email id <p className="text-red-500">*</p>{" "}
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your Email"
                          required=""
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password" className="flex gap-1">
                          Password<p className="text-red-500">*</p>
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your Password"
                          required=""
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              required=""
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="remember"
                              class="text-gray-500 dark:text-gray-300"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href="#"
                          class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Forgot password?
                        </a>
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
                      <CardTitle>Create a new Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor="username"
                          required=""
                          className="flex gap-1"
                        >
                          Username<p className="text-red-500">*</p>
                        </Label>
                        <Input id="name" placeholder="Enter your Username" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="flex gap-1">
                          Email id<p className="text-red-500">*</p>
                        </Label>
                        <Input
                          id="email"
                          placeholder="Enter your Email"
                          type="email"
                          required=""
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="current" className="flex gap-1">
                          Password<p className="text-red-500">*</p>
                        </Label>
                        <Input
                          id="current"
                          type="password"
                          placeholder="Enter your Password"
                          required=""
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new" className="flex gap-1">
                          Re-Enter password<p className="text-red-500">*</p>
                        </Label>
                        <Input
                          id="new"
                          type="password"
                          placeholder="Re-Enter your Password"
                        />
                      </div>
                      <div>
                        {" "}
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="newsletter"
                              aria-describedby="newsletter"
                              type="checkbox"
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              required=""
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="newsletter"
                              class="font-light text-gray-500 dark:text-gray-300"
                            >
                              I accept the{" "}
                              <a
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                href="#"
                              >
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                        </div>
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
