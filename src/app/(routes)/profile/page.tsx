"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getRequest, putRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice";
import { useRouter } from "next/navigation";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";

export default function Profile() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [userDetails, setUserDetails] = useState<UserDetails>(
		{} as UserDetails
	);
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
	const [refresh, setRefresh] = useState(false);
	const { toast } = useToast();
	useEffect(() => {
		if (isLoggedIn) {
			fetchUserDetails()
				.then((data) => setUserDetails(data))
				.catch((error) =>
					console.error("Error fetching user details:", error)
				);
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
				}
			);

			const data = await dataPromise;
			return data;
		} catch (error) {
			console.error("Error fetching user details:", error);
			throw new Error("Error fetching user details");
		}
	}

	async function updateUserDetails(): Promise<void> {
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
								<Input
									name="userName"
									disabled
									className="w-2/3"
									value={userDetails.userName}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>FirstName :</Label>
								<Input
									name="firstName"
									className="w-2/3"
									value={userDetails.firstName}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>Lastname :</Label>
								<Input
									name="lastName"
									className="w-2/3"
									value={userDetails.lastName}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>Email :</Label>
								<Input
									name="userEmail"
									disabled
									className="w-2/3"
									value={userDetails.userEmail}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>Phone Number :</Label>
								<Input
									name="userPhone"
									disabled
									className="w-2/3"
									value={userDetails.userPhone}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>Country :</Label>
								<Input
									name="userCountry"
									className="w-2/3"
									value={userDetails.userCountry}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>Github :</Label>
								<Input
									name="githubLink"
									className="w-2/3"
									value={userDetails.githubLink}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>LinkedIn :</Label>
								<Input
									name="linkedInLink"
									className="w-2/3"
									value={userDetails.linkedInLink}
									onChange={handleChange}
								/>
							</div>
							<div className="flex justify-between">
								<Label>Institute :</Label>
								<Input
									name="userInstitute"
									className="w-2/3"
									value={userDetails.userInstitute}
									onChange={handleChange}
								/>
							</div>
						</CardHeader>
						<CardFooter className="flex justify-between">
							<Button
								variant="outline"
								onClick={updateUserDetails}
							>
								Update
							</Button>
							<Button onClick={handleLogout}>Logout</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
}
