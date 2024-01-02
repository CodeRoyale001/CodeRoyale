import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const UserRegistration = () => {
  return (<>
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
  </>
  )
}

export default UserRegistration