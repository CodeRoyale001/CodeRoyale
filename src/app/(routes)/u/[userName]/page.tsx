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
import { getRequestWithoutAccessToken } from "@/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState, useEffect, Suspense } from "react";
import { useDispatch,useSelector } from "react-redux";
import * as Icon from "iconic-react";
import SubmissionCard from "@/components/profile/submissionCard";
import { logout } from "@/redux/slice";

export default function Profile({ params }: { params: { userName: string } }) {
  const { isLoggedIn, userName } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails
  );
  const [submission, setSubmission] = useState<SubmissionDTO[]>([]);

  useEffect(() => {
    fetchUserDetails()
      .then((data) => setUserDetails(data))
      .catch((error) => console.error("Error fetching user details:", error));
    fetchUserSubmission()
      .then((data) => setSubmission(data))
      .catch((error) => console.error("Error fetching user submission:", error));
  }, []);
const handleLogout = () => {
  dispatch(logout());
}
  async function fetchUserDetails(): Promise<UserDetails> {
    try {
      const url = process.env.JS_URI + `/user/getUser/${params.userName}`;
      const dataPromise: Promise<UserDetails> = new Promise(
        (resolve, reject) => {
          getRequestWithoutAccessToken(url, (data: UserDetails) => {
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
  async function fetchUserSubmission(): Promise<SubmissionDTO[]> {
    try {
      const url = `${process.env.GO_URI}/getsubmission/user/${params.userName}?limit=10`;
  
      const dataPromise: Promise<SubmissionDTO[]> = new Promise((resolve, reject) => {
        getRequestWithoutAccessToken(url, (data: SubmissionDTO[]) => {
          if (data && Array.isArray(data)) {
            resolve(data);
          } else {
            reject(new Error("Failed to fetch user submission"));
          }
        });
      });
  
      const data = await dataPromise;
      console.log(data);
  
      return data;
    } catch (error) {
      console.error("Error fetching user submission:", error);
      throw new Error("Error fetching user submission");
    }
  }
  
  return (
    <>
      <title>{params.userName}</title>
      <Navbar />
      <div className="h-full m-10  flex overflow-hidden">
        <div className="leftPanel w-1/3 p-10">
          <Card className="flex flex-col justify-between gap-y-80">
            <CardHeader>
              <Avatar className="size-28 my-3">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Separator />
              <div className="flex justify-between">
                <div className="flex">
                  <Icon.Profile size="28" color="#cf354c" />
                  <Label className="text-lg">Username :</Label>
                </div>
                <CardTitle className="text-lg">
                  {userDetails.userName}
                </CardTitle>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <Icon.House size="28" color="#cf354c" />
                  <Label className="text-lg">Country :</Label>
                </div>
                <CardTitle className="text-lg">
                  {userDetails.userCountry}
                </CardTitle>
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <Icon.Book size="28" color="#cf354c" />
                  <Label className="test-lg">Institute :</Label>
                </div>
                <CardTitle className="text-lg">
                  {userDetails.userInstitute}
                </CardTitle>
              </div>
            </CardHeader>
            {isLoggedIn && userName == params.userName ? (
              <CardFooter className="flex justify-between">
                <Button variant="outline">Update</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </CardFooter>
            ) : (
              <p></p>
            )}
          </Card>
        </div>
        <div className="relative rightPanel w-2/3 p-10">
          <Card className="size-100">
            <p className="absolute right-1 text-3xl px-14 py-2">12345</p>
            <div className="flex justify-between mr-40 ml-10">
              <Card className="size-32">
                <CardContent className="text-5xl text-center my-5">
                  20
                  <p className="text-sm">Easy</p>
                </CardContent>
              </Card>
              <Card className="size-32">
                <CardContent className="text-5xl text-center my-5">
                  20
                  <p className="text-sm">Medium</p>
                </CardContent>
              </Card>
              <Card className="size-32">
                <CardContent className="text-5xl text-center my-5">
                  20
                  <p className="text-sm">Hard</p>
                </CardContent>
              </Card>
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {submission.length == 0 ? "No Submissions Found" :
              submission.slice(0, 10).map((submission, index) => (
                <SubmissionCard
                  key={index}
                  Id={submission.questionId}
                  language={submission.language}
                  submittime={submission.submitTime}
                />
              ))
            }
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
