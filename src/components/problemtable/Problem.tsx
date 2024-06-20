import React, { useEffect, useState } from "react";
import { Problem, columns } from "./columns"
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHeader,
	TableHead,
} from "@/components/ui/table";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { PaginationSection } from "../paginations/pagination";
import SpoilerCell from "./spoilerCell";
import SkeletonTable from "./skeletonTable";
import { DataTable } from "../ui/data-table";

const ProblemTable: React.FC = () => {
	const [problems, setProblems] = useState<any>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	useEffect(() => {
		fetchProblems();
	}, []);

	const fetchProblems = async () => {
		try {
			const url = process.env.JS_URI + "/api/getProblem";
			const accessToken = getCookie("accessToken");
			if (accessToken.length === 0) {
				// use effect
				alert("Please Login");
			} else {
				await getRequest(url, accessToken, (response) => {
					setProblems(response);
				});
			}
		} catch (error) {
			console.error("Error fetching problems:", error);
		}
	};

	if (!problems) {
		return <SkeletonTable />;
	}

	const lastItemIndex = currentPage * itemsPerPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const currentProblems = problems.slice(firstItemIndex, lastItemIndex);

	const convertProblemName = (title: string) => {
		return title.toLowerCase().replace(/\s+/g, "-");
	};

	return (
		// <div className="flex justify-center px-20 py-5">
		<DataTable  columns={columns} data={problems}/>
		// </div>

	// 	<>
	// 		<div className="flex justify-center px-20 py-5">
	// 			<Table className="w-full max-w-[70%] mx-auto border rounded-lg">
	// 				<TableHeader>
	// 					<TableRow>
	// 						<TableHead className="w-1/12 text-center">
	// 							Sr. No.
	// 						</TableHead>
	// 						<TableHead className="w-5/12">
	// 							Problem Name
	// 						</TableHead>
	// 						<TableHead className="w-2/12 text-center">
	// 							Tags
	// 						</TableHead>
	// 						<TableHead className="w-2/12 text-center">
	// 							Difficulty
	// 						</TableHead>
	// 						<TableHead className="w-2/12 text-center">
	// 							Status
	// 						</TableHead>
	// 					</TableRow>
	// 				</TableHeader>
	// 				<TableBody>
	// 			{currentProblems.map(
	// 						(currentProblem: any, index: number) => (
	// 							<TableRow key={currentProblem.id}>
	// 								<TableCell className="text-center">
    //               {firstItemIndex + index + 1}
	// 								</TableCell>
	// 								<TableCell>
	// 									<Link
	// 										href={`/problems/${encodeURIComponent(
	// 											convertProblemName(
	// 												currentProblem.title
	// 											)
	// 										)}`}
	// 										className="hover:font-bold transition duration-300 ease-in-out transform hover:-translate-y-1"
	// 									>
	// 										{currentProblem.title[0].toUpperCase() +
	// 											currentProblem.title.slice(1)}
	// 									</Link>
	// 								</TableCell>
	// 								<SpoilerCell tags={currentProblem.tags} />
	// 								<TableCell className="text-center">
	// 									<span
	// 										className={
	// 											currentProblem.difficulty.toLowerCase() ===
	// 											"easy"
	// 												? "text-green-500"
	// 												: currentProblem.difficulty.toLowerCase() ===
	// 												  "medium"
	// 												? "text-yellow-500"
	// 												: "text-red-500"
	// 										}
	// 									>
	// 										{currentProblem.difficulty[0].toUpperCase() +
	// 											currentProblem.difficulty.slice(
	// 												1
	// 											)}
	// 									</span>
	// 								</TableCell>
	// 								<TableCell className="text-center">
	// 									Solved
	// 								</TableCell>
	// 							</TableRow>
	// 						)
	// 					)}
	// 			</TableBody>
	// 			</Table>
	// 		</div>

    //   {problems.length >= 10 && (
	// 		<PaginationSection
	// 			totalItems={problems.length}
	// 			itemsPerPage={itemsPerPage}
	// 			currentPage={currentPage}
	// 			setCurrentPage={setCurrentPage}
	// 		/>
    //   )}
	// 	</>
	);
};

export default ProblemTable;


