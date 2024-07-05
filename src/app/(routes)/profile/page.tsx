"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";
type UserDetails = {
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhone: string;
  userCountry: string;
  userRole: number;
  userInstitute: string;
};

export default function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails
  );
  const userName=getCookie("userName");
  useEffect(() => {
    fetchUserDetails()
      .then((data) => setUserDetails(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  async function fetchUserDetails(): Promise<UserDetails> {
    try {
      const url = process.env.JS_URI + "/user/getUser";
      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        throw new Error("Please Login");
      }

      const dataPromise: Promise<UserDetails> = new Promise(
        (resolve, reject) => {
          getRequest(url, accessToken, (data: UserDetails) => {
            if (data) {
              resolve(data);
            } else {
              reject(new Error("Failed to fetch user details"));
            }
          });
        }
      );

      const data = await dataPromise;
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw new Error("Error fetching user details");
    }
  }
  return (
    <>
    <title>{userName + "- Profile"}</title>
      <Navbar />
      <div className="h-5/6 flex justify-center">
        <div className="leftPanel w-2/3 my-2 mx-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
              <Avatar className="size-28 my-3">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="my-4 mx-2">
                <Label htmlFor="picture">Avatar</Label>
                <Input id="picture" type="file" />
              </div>
              </div>

              <Separator />
              <div className="flex justify-between">
                <Label>Username :</Label>
                <Input disabled className="w-2/3" placeholder={userDetails.userName} />
              </div>
              <div className="flex justify-between">
                <Label>FirstName :</Label>
                <Input className="w-2/3" placeholder={userDetails.firstName} />
              </div>
              <div className="flex justify-between">
                <Label>Lastname :</Label>
                <Input className="w-2/3" placeholder={userDetails.lastName} />
              </div>
              <div className="flex justify-between">
                <Label>Email :</Label>
                <Input disabled className="w-2/3" placeholder={userDetails.userEmail} />
              </div>
              <div className="flex justify-between">
                <Label>Phone Number :</Label>
                <Input disabled className="w-2/3" placeholder={userDetails.userPhone} />
              </div>
              <div className="flex justify-between">
                <Label>Country :</Label>
                <Input
                  className="w-2/3"
                  placeholder={userDetails.userCountry}
                />
              </div>
              <div className="flex justify-between">
                <Label>Github :</Label>
                <Input
                  className="w-2/3"
                  placeholder={userDetails.userInstitute}
                />
              </div>
              <div className="flex justify-between">
                <Label>LinkedIn :</Label>
                <Input
                  className="w-2/3"
                  placeholder={userDetails.userInstitute}
                />
              </div>
              <div className="flex justify-between">
                <Label>Institute :</Label>
                <Input
                  className="w-2/3"
                  placeholder={userDetails.userInstitute}
                />
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Update</Button>
              <Button>Logout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
