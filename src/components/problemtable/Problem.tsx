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
const ProblemTable: React.FC = () => {
	const [problems, setProblems] = useState<any>(null);
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

	const convertProblemName = (title: string) => {
		return title.toLowerCase().replace(/\s+/g, "-");
	};

	// const redirectToProblemPage = (problemTitle: string) => {
	// 	router.push(`/problems/${problemTitle}`);
	// };

	return (
		<>
			{problems ? (
				<Table style={{ maxWidth: "800px", border: "1px solid black" }}>
					<TableHeader>
						<TableRow>
							<TableHead style={{ border: "1px solid black" }}>
								Sr. No.
							</TableHead>
							<TableHead style={{ border: "1px solid black" }}>
								Problem Name
							</TableHead>
							<TableHead style={{ border: "1px solid black" }}>
								Difficulty
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{problems.map((problem: any, index: number) => (
							<TableRow key={problem.id}>
								<TableCell
									style={{ border: "1px solid black" }}
								>
									{index + 1}
								</TableCell>
								<TableCell
									style={{ border: "1px solid black" }}
								>
          							<Link href={`/problems/${encodeURIComponent(convertProblemName(problem.title))}`}>
										{problem.title}
									</Link>
								</TableCell>
								<TableCell
									style={{ border: "1px solid black" }}
								>
									{problem.difficulty}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<p>Loading all the problems...</p>
			)}
		</>
	);
};

export default ProblemTable;
