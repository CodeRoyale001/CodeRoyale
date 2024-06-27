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
					<p>This is Contests Page</p>
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
