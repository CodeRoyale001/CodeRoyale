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
  const [imgloading, setImgLoading] = useState(false);

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

      const updatedUserDetails: { [key: string]: any } = {
        userName: userDetails.userName,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userPhone: userDetails.userPhone,
        userCountry: userDetails.userCountry,
        userInstitute: userDetails.userInstitute,
        githubLink: userDetails.githubLink || "",
        linkedInLink: userDetails.linkedInLink || "",
        twitterLink: userDetails.twitterLink || "",
        // Do not include userPassword and userRole in the update
      };

      await putRequest(url, updatedUserDetails, accessToken, (data) => {
        setRefresh((prev) => !prev);
        toast({
          title: "Update Successful",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file); // Set the actual file object in state
    }
  };

  const handleSubmit = async () => {
    if (!avatar) return;
    try {
      setImgLoading(true);
      const url = process.env.JS_URI + "/user/uploadavatar";

      const response = await handleAvatarUpload(
        url,
        avatar,
        getCookie("accessToken"),
      );
      if (response.url) {
        // Update the avatar with the uploaded image URL
        setAvatarUrl(response.url);
        toast({
          title: "Avatar Update Successful",
          description: `${userDetails.userName}'s avatar updated successfully`,
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong",
          description: `${userDetails.userName}'s avatar update failed`,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Uh oh! Something went wrong",
        description: `File Not Uploaded`,
      });
    } finally {
      setImgLoading(false);
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
      <div className="flex justify-center mt-12 px-4 lg:px-0">
        <div className="w-full max-w-4xl">
          <Card className="p-6 lg:p-10">
            <CardHeader>
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-4 lg:space-y-0 lg:space-x-80 mb-2">
                  <Avatar className="w-24 h-24 rounded-full">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-row gap-3 items-center lg:items-start">
                    <Input
                      onChange={handleFileChange}
                      id="picture"
                      type="file"
                      className="max-w-[260px]"
                    />
                    <LoadingButton
                      loading={imgloading}
                      onClick={handleSubmit}
                      className="item-center"
                    >
                      Upload
                    </LoadingButton>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Username",
                  name: "userName",
                  disabled: true,
                  type: "text",
                },
                { label: "First Name", name: "firstName", type: "text" },
                { label: "Last Name", name: "lastName", type: "text" },
                {
                  label: "Email",
                  name: "userEmail",
                  disabled: true,
                  type: "email",
                },
                {
                  label: "Phone Number",
                  name: "userPhone",
                  disabled: true,
                  type: "tel",
                },
                { label: "Country", name: "userCountry", type: "text" },
                { label: "Github", name: "githubLink", type: "url" },
                { label: "LinkedIn", name: "linkedInLink", type: "url" },
                { label: "Twitter", name: "twitterLink", type: "url" },
                { label: "Institute", name: "userInstitute", type: "text" },
              ].map((field, idx) => (
                <div
                  className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
                  key={idx}
                >
                  <Label className="lg:w-1/3">{field.label} :</Label>
                  <Input
                    name={field.name}
                    type={field.type}
                    disabled={field.disabled}
                    className="w-full lg:w-2/3 mt-2 lg:mt-0"
                    value={userDetails[field.name as keyof UserDetails] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <LoadingButton
                loading={loading}
                className="w-full lg:w-auto"
                variant="outline"
                onClick={updateUserDetails}
              >
                Update
              </LoadingButton>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full lg:w-auto">Logout</Button>
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
