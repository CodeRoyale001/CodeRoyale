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
import * as Icon from "iconic-react";
import SubmissionCard from "@/components/profile/submissionCard";
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

const questions = [
  {
    questionId: "Q1",
    language: "English",
    submittime: "10:00 AM",
    Id: "Longest Substring Without Repeating Characters",
  },
  {
    questionId: "Q2",
    language: "Spanish",
    submittime: "10:30 AM",
    Id: "Two Sum",
  },
  {
    questionId: "Q3",
    language: "French",
    submittime: "11:00 AM",
    Id: "Add Two Numbers",
  },
  {
    questionId: "Q4",
    language: "German",
    submittime: "11:30 AM",
    Id: "Median of Two Sorted Arrays",
  },
  {
    questionId: "Q5",
    language: "Chinese",
    submittime: "12:00 PM",
    Id: "Longest Palindromic Substring",
  },
  {
    questionId: "Q6",
    language: "Japanese",
    submittime: "12:30 PM",
    Id: "Container With Most Water",
  },
  {
    questionId: "Q7",
    language: "Korean",
    submittime: "01:00 PM",
    Id: "Integer to Roman",
  },
  {
    questionId: "Q8",
    language: "Hindi",
    submittime: "01:30 PM",
    Id: "Roman to Integer",
  },
  {
    questionId: "Q9",
    language: "Russian",
    submittime: "02:00 PM",
    Id: "ZigZag Conversion",
  },
  {
    questionId: "Q10",
    language: "Portuguese",
    submittime: "02:30 PM",
    Id: "Reverse Integer",
  },
];

export default function Profile({ params }: { params: { userName: string } }) {
  const { isLoggedIn, userName } = useSelector(
    (state: RootState) => state.user
  );
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
                <Button>Logout</Button>
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
              {questions.slice(0, 10).map((question, index) => (
                <SubmissionCard
                  key={index}
                  Id={question.Id}
                  language={question.language}
                  submittime={question.submittime}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
