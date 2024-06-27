"use client";

import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import ProblemTable from "@/components/problemtable/Problem";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Problems() {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
	return (
		<>
			<Navbar />
			{isLoggedIn?
			<div className="pt-12 px-40">
				<ProblemTable />
			</div>:
			<LoginWarnPopup />
			}
		</>
	);
}
