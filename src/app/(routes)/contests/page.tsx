"use client";

import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Contests() {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	return (
		<>
			{isLoggedIn ? (
				<>
					<Navbar />
					<div className="flex items-center justify-center  min-h-[calc(100vh-200px)]">
  <p className="text-center text-5xl  font-extralight tracking-wider">Coming Soon</p>
</div>
				</>
			) : (
				<>
					<Navbar />
					<LoginWarnPopup isLoggedIn={isLoggedIn} />
				</>
			)}
		</>
	);
}
