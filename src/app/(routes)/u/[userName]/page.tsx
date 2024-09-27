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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Home,
  University,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import SubmissionCard from "@/components/profile/submissionCard";
import { logout } from "@/redux/slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function Profile({ params }: { params: { userName: string } }) {
  const { isLoggedIn, userName } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

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
      .catch((error) =>
        console.error("Error fetching user submission:", error)
      );
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

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

      const dataPromise: Promise<SubmissionDTO[]> = new Promise(
        (resolve, reject) => {
          getRequestWithoutAccessToken(url, (data: SubmissionDTO[]) => {
            if (data && Array.isArray(data)) {
              resolve(data);
            } else {
              reject(new Error("Failed to fetch user submission"));
            }
          });
        }
      );

      const data = await dataPromise;
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error fetching user submission:", error);
      throw new Error("Error fetching user submission");
    }
  }

  // Compute full name
  const fullName = [userDetails.firstName, userDetails.lastName]
    .filter(Boolean)
    .join(" ");

  // Function to extract username from URL
  const extractUsername = (url: string, platform: string): string => {
    try {
      const parsedUrl = new URL(url);
      let pathname = parsedUrl.pathname;

      // Remove any trailing slashes
      if (pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }

      let username = "";

      if (platform === "github" || platform === "twitter") {
        username = pathname.substring(1); // Remove leading slash
      } else if (platform === "linkedin") {
        const parts = pathname.split("/");
        // For LinkedIn, the username is usually after "/in/"
        const index = parts.indexOf("in");
        if (index !== -1 && parts.length > index + 1) {
          username = parts[index + 1];
        }
      }

      return `@${username}`;
    } catch (error) {
      console.error(`Error parsing ${platform} URL:`, error);
      return "";
    }
  };

  return (
    <>
      <title>{params.userName}</title>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Panel */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <Card className="flex flex-col justify-between h-full">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="w-28 h-28 mb-4">
                    <AvatarImage
                      src={
                        userDetails.userAvatar ||
                        "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl">
                    {userDetails.userName}
                  </CardTitle>
                  {/* Display Full Name if available */}
                  {fullName && (
                    <p className="text-lg text-muted">{fullName}</p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  {/* Username */}
                  {userDetails.userName && (
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <Label className="text-lg">Username:</Label>
                      <span className="ml-auto text-lg">
                        {userDetails.userName}
                      </span>
                    </div>
                  )}
                  {/* Full Name */}
                  {fullName && (
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <Label className="text-lg">Full Name:</Label>
                      <span className="ml-auto text-lg">{fullName}</span>
                    </div>
                  )}
                  {/* Email */}
                  {userDetails.userEmail && (
                    <div className="flex items-center">
                      <Mail className="mr-2" />
                      <Label className="text-lg">Email:</Label>
                      <span className="ml-auto text-lg">
                        {userDetails.userEmail}
                      </span>
                    </div>
                  )}
                  {/* Phone Number */}
                  {userDetails.userPhone && (
                    <div className="flex items-center">
                      <Phone className="mr-2" />
                      <Label className="text-lg">Phone Number:</Label>
                      <span className="ml-auto text-lg">
                        {userDetails.userPhone}
                      </span>
                    </div>
                  )}
                  {/* Country */}
                  {userDetails.userCountry && (
                    <div className="flex items-center">
                      <Home className="mr-2" />
                      <Label className="text-lg">Country:</Label>
                      <span className="ml-auto text-lg">
                        {userDetails.userCountry}
                      </span>
                    </div>
                  )}
                  {/* Institute */}
                  {userDetails.userInstitute && (
                    <div className="flex items-center">
                      <University className="mr-2" />
                      <Label className="text-lg">Institute:</Label>
                      <span className="ml-auto text-lg">
                        {userDetails.userInstitute}
                      </span>
                    </div>
                  )}
                  {/* GitHub */}
                  {userDetails.githubLink && (
                    <div className="flex items-center">
                      <Github className="mr-2" />
                      <Label className="text-lg">GitHub:</Label>
                      <a
                        href={userDetails.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-lg text-blue-500 hover:underline"
                      >
                        {extractUsername(userDetails.githubLink, "github")}
                      </a>
                    </div>
                  )}
                  {/* LinkedIn */}
                  {userDetails.linkedInLink && (
                    <div className="flex items-center">
                      <Linkedin className="mr-2" />
                      <Label className="text-lg">LinkedIn:</Label>
                      <a
                        href={userDetails.linkedInLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-lg text-blue-500 hover:underline"
                      >
                        {extractUsername(userDetails.linkedInLink, "linkedin")}
                      </a>
                    </div>
                  )}
                  {/* Twitter */}
                  {userDetails.twitterLink && (
                    <div className="flex items-center">
                      <Twitter className="mr-2" />
                      <Label className="text-lg">Twitter:</Label>
                      <a
                        href={userDetails.twitterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-lg text-blue-500 hover:underline"
                      >
                        {extractUsername(userDetails.twitterLink, "twitter")}
                      </a>
                    </div>
                  )}
                </div>
              </CardHeader>
              {isLoggedIn && userName == params.userName ? (
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/profile")}
                  >
                    Update
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Logout</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to log out of the platform. Ensure all
                          your work is saved before proceeding.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              ) : null}
            </Card>
          </div>
          {/* Right Panel */}
          <div className="md:w-2/3 space-y-8">
            <Card>
              <CardContent>
                <div className="flex justify-around mt-8">
                  {/* Easy Circle */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-secondary text-green-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-4xl font-bold">20</span>
                    </div>
                    <p className="text-sm mt-2">Easy</p>
                  </div>
                  {/* Medium Circle */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-secondary text-yellow-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-4xl font-bold">20</span>
                    </div>
                    <p className="text-sm mt-2">Medium</p>
                  </div>
                  {/* Hard Circle */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-secondary text-red-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-4xl font-bold">20</span>
                    </div>
                    <p className="text-sm mt-2">Hard</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {submission.length === 0 ? (
                  <p>No Submissions Found</p>
                ) : (
                  submission.slice(0, 10).map((submission, index) => (
                    <SubmissionCard
                      key={index}
                      Id={submission.questionId}
                      language={submission.language}
                      submittime={submission.submitTime}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
