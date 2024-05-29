"use client";

import Navbar from "@/components/navbar";
import ProblemTable from "@/components/problemtable/Problem";

export default function Problems() {
	return (
		<>
			<Navbar />
			<div className="pt-12 px-12">
				<ProblemTable />
			</div>
		</>
	);
}
