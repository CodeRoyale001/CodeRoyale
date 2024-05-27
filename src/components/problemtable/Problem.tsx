import React, { useEffect, useState } from "react";
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
	const [problems, setProblems] = React.useState<any>(null);

	React.useEffect(() => {
		fetchProblems();
	}, []);

	const fetchProblems = async () => {
		try {
			const url =process.env.JS_URI +"/api/getProblem";
			const accessToken = getCookie("accessToken");
			if (accessToken.length == 0) {
                // use effect
				alert("Please Login");
			} else {
				await getRequest(url, accessToken, (response) => {
					// Change state + store tokens;
					setProblems(response);
				});
			}
		} catch (error) {
			console.error("Error fetching problems:", error);
		}
	};

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
									{problem.title}
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
			)
            }
		</>
	);
};

export default ProblemTable;
