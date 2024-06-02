"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/redux/store";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import * as Icon  from "iconic-react";
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

export default function Profile({ params }: { params: { userName: string } }) {
  const { isLoggedIn,userName } = useSelector((state: RootState) => state.user);
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails
  );

  useEffect(() => {
    fetchUserDetails()
      .then((data) => setUserDetails(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  async function fetchUserDetails(): Promise<UserDetails> {
    try {
      const url = process.env.JS_URI + `/user/getUser/${params.userName}`;
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
      <Navbar />
      <div className="h-full my-4 flex">
        <div className="leftPanel w-1/3 mx-2">
          <Card className="flex flex-col justify-between gap-y-80">
            <CardHeader>
              <Avatar className="size-28 my-3">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Separator />
              <div className="flex justify-between">
                <div className="flex">
              <Icon.Profile size="28" color="#cf354c"/>
                <Label className="text-lg">Username :</Label>
                </div>
                <CardTitle className="text-lg">{userDetails.userName}</CardTitle>
              </div>

              <div className="flex justify-between">
              <div className="flex">
              <Icon.House size="28" color="#cf354c"/>
                <Label className="text-lg">Country :</Label>
                </div>
                <CardTitle className="text-lg">{userDetails.userCountry}</CardTitle>
              </div>
              <div className="flex">
              <Icon.Book size="28" color="#cf354c"/>
                <Label>Institute :</Label>
                <CardTitle>{userDetails.userInstitute}</CardTitle>
              </div>
            </CardHeader>
            {isLoggedIn && userName==params.userName?(<CardFooter  className="flex justify-between">
              <Button variant="outline">Update</Button>
              <Button>Logout</Button>
            </CardFooter>):(<p></p>)
}
          </Card>
        </div>
        <div className="relative rightPanel w-2/3">
          <Card className="size-100 my-2 mx-1">
            <p className="absolute right-10">Total Problem</p>
            <div className="my-8 flex justify-between mx-6">
              <Card className="size-32">
                <CardContent>20</CardContent>
                <CardFooter>
                  <p>Easy</p>
                </CardFooter>
              </Card>
              <Card className="size-32">
                <CardContent>100</CardContent>
                <CardFooter>
                  <p>Medium</p>
                </CardFooter>
              </Card>
              <Card className="size-32">
                <CardContent>100</CardContent>
                <CardFooter>
                  <p>Hard</p>
                </CardFooter>
              </Card>
            </div>
          </Card>
          <Card className="h-80 mx-1 my-1">Subsmissions</Card>
        </div>
      </div>
    </>
  );
}
