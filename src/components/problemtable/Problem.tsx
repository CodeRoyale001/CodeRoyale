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

const ProblemTable: React.FC = () => {
	const [problems, setProblems] = React.useState<any>(null);

	React.useEffect(() => {
		fetchProblems();
	}, []);
	const fetchProblems = async () => {
		try {
			const url = "https://serene-fortress-91389-77d1fb95872a.herokuapp.com/api/getProblems"; 
			const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ5ZGViMTNiMzVmMTE3NmFmYzEyNTAiLCJ1c2VyUm9sZSI6MywiaWF0IjoxNzE2MTQwMjI0LCJleHAiOjE3MTg3MzIyMjR9.t3AtyzLJMBudCm090pasiTuWemLxaXDmBG64Y6q6Ij0"; 
            
			await getRequest(url, accessToken, (response) => {
				// Change state + store tokens;
				alert("Login Successful");
			});
		} catch (error) {
			console.error("Error fetching problems:", error);
		}
	};

	return (
		<>
			{problems ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Sr. No.</TableHead>
							<TableHead>Problem Name</TableHead>
							<TableHead>Difficulty</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{problems.map((problem, index) => (
							<TableRow key={problem.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{problem.name}</TableCell>
								<TableCell>{problem.difficulty}</TableCell>
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
