import React, { useEffect, useState } from "react";
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
		<>
			<div className="flex justify-center px-20 py-5">
				<Table className="w-full max-w-[70%] mx-auto">
					<TableHeader>
						<TableRow>
							<TableHead className="border border-black w-1/12 text-center">
								Sr. No.
							</TableHead>
							<TableHead className="border border-black w-5/12">
								Problem Name
							</TableHead>
							<TableHead className="border border-black w-2/12">
								Tags
							</TableHead>
							<TableHead className="border border-black w-2/12 text-center">
								Difficulty
							</TableHead>
							<TableHead className="border border-black w-2/12 text-center">
								Status
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
				{currentProblems.map(
							(currentProblem: any, index: number) => (
								<TableRow key={currentProblem.id}>
									<TableCell className="border border-black text-center">
                  {firstItemIndex + index + 1}
									</TableCell>
									<TableCell className="border border-black">
										<Link
											href={`/problems/${encodeURIComponent(
												convertProblemName(
													currentProblem.title
												)
											)}`}
										>
											{currentProblem.title[0].toUpperCase() +
												currentProblem.title.slice(1)}
										</Link>
									</TableCell>
									<SpoilerCell tags={currentProblem.tags} />
									<TableCell className="border border-black text-center">
										<span
											className={
												currentProblem.difficulty.toLowerCase() ===
												"easy"
													? "text-green-500"
													: currentProblem.difficulty.toLowerCase() ===
													  "medium"
													? "text-yellow-500"
													: "text-red-500"
											}
										>
											{currentProblem.difficulty[0].toUpperCase() +
												currentProblem.difficulty.slice(
													1
												)}
										</span>
									</TableCell>
									<TableCell className="border border-black text-center">
										Solved
									</TableCell>
								</TableRow>
							)
						)}
				</TableBody>
				</Table>
			</div>

      {problems.length >= 10 && (
			<PaginationSection
				totalItems={problems.length}
				itemsPerPage={itemsPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
      )}
		</>
	);
};

export default ProblemTable;
