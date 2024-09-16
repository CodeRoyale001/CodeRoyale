"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-btn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getRequest, handleAvatarUpload, putRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice";
import { useRouter } from "next/navigation";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
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

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {} as UserDetails,
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("https://github.com/shadcn.png");
  const { toast } = useToast();
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails()
        .then((data) => {
          setUserDetails(data);
          setAvatarUrl(data.userAvatar);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [isLoggedIn]);

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
        },
      );

      const data = await dataPromise;
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw new Error("Error fetching user details");
    }
  }

  async function updateUserDetails(): Promise<void> {
    setLoading(true);
    try {
      const url = process.env.JS_URI + "/user/updateUser";
      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        throw new Error("Please Login");
      }

      const updatedUserDetails: { [key: string]: string } = {
        userName: userDetails.userName,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userPhone: userDetails.userPhone,
        userCountry: userDetails.userCountry,
        userInstitute: userDetails.userInstitute,
        githubLink: userDetails.githubLink || "",
        linkedInLink: userDetails.linkedInLink || "",
        twitterLink: userDetails.twitterLink || "",
        userAvatar: userDetails.userAvatar || "",
      };

      await putRequest(url, updatedUserDetails, accessToken, (data) => {
        setRefresh((prev) => !prev);
        toast({
          title: "Updation Successful",
          description: `${data.userName}'s details updated successfully`,
        });
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      throw new Error("Error updating user details");
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file); // Set the actual file object in state
    }
  };

  const handleSubmit = async () => {
    if (!avatar) return;
    try {
      const url = process.env.JS_URI + "/user/uploadavatar";
      console.log("updating");

      const response = await handleAvatarUpload(
        url,
        avatar,
        getCookie("accessToken"),
      );
      if (response.url) {
        // Update the avatar with the uploaded image URL
        setAvatarUrl(response.url);
        toast({
          title: "Avatar Updation Successful",
          description: `${userDetails.userName}'s avatar updated successfully`,
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong",
          description: `${userDetails.userName}'s avatar updation failed`,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Uh oh! Something went wrong",
        description: `File Not Uploaded`,
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <LoginWarnPopup isLoggedIn={isLoggedIn} />
      </>
    );
  }
  return (
    <>
      <title>{"Update - Profile"}</title>
      <Navbar />
      <div className="h-5/6 flex justify-center mt-12">
        <div className="leftPanel w-2/3 my-2 mx-2">
          <Card className="p-4">
            <CardHeader className="px-12 py-4">
              <div className="flex justify-between">
                <Avatar className="size-28 my-3 ">
                  <AvatarImage src={avatarUrl} className="rounded-2xl" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="my-4 mx-2">
                  <Label htmlFor="picture">Avatar</Label>
                  <Input onChange={handleFileChange} id="picture" type="file" />
                  <Button onClick={handleSubmit}>Upload</Button>
                </div>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className="px-24 space-y-3">
              <div className="flex items-center justify-between mx-4">
                <Label>Username :</Label>
                <Input
                  name="userName"
                  disabled
                  className="w-2/3"
                  value={userDetails.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>FirstName :</Label>
                <Input
                  name="firstName"
                  className="w-2/3"
                  value={userDetails.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>Lastname :</Label>
                <Input
                  name="lastName"
                  className="w-2/3"
                  value={userDetails.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>Email :</Label>
                <Input
                  name="userEmail"
                  disabled
                  className="w-2/3"
                  value={userDetails.userEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>Phone Number :</Label>
                <Input
                  name="userPhone"
                  disabled
                  className="w-2/3"
                  value={userDetails.userPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>Country :</Label>
                <Input
                  name="userCountry"
                  className="w-2/3"
                  value={userDetails.userCountry}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>Github :</Label>
                <Input
                  name="githubLink"
                  className="w-2/3"
                  value={userDetails.githubLink}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>LinkedIn :</Label>
                <Input
                  name="linkedInLink"
                  className="w-2/3"
                  value={userDetails.linkedInLink}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between mx-4">
                <Label>Institute :</Label>
                <Input
                  name="userInstitute"
                  className="w-2/3"
                  value={userDetails.userInstitute}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between px-16 py-4">
              <LoadingButton
                loading={loading}
                className="py-4 w-1/6"
                variant="outline"
                onClick={updateUserDetails}
              >
                Update
              </LoadingButton>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="py-4 w-1/6">Logout</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to log out of the platform. Ensure all your
                      work is saved before proceeding.
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
          </Card>
        </div>
      </div>
    </>
  );
}
