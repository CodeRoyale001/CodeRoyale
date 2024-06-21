import React from "react";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";

interface ProblemProps {
	problemTitle: string;
}

const Problem: React.FC<ProblemProps> = ({ problemTitle }) => {
	const [problem, setProblem] = React.useState<any>(null);
	const [error, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		fetchProblemDetails();
	}, []);

	const formatDifficulty = (difficulty: string) => {
		return (
			difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
		);
	};

	const fetchProblemDetails = async () => {
		try {
			const url =
				process.env.JS_URI + `/api/getProblem?title=${problemTitle}`;
			const accessToken = getCookie("accessToken");
			getRequest(url, accessToken, (response) => {
				setProblem(response);
			});
		} catch (error) {
			console.error("Error fetching problem details:", error);
			alert("Error fetching problem details:");
			setError(true);
		}
	};
	if (error) {
		return <div>No such Problem</div>;
	}

	return (
		<>
		{problem ? (
			<div className="h-content min-w-[350px] mx-auto py-8 px-4 overflow-y-auto ">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">{problem.title}</h2>
					<p className="text-sm text-gray-600">Difficulty : {formatDifficulty(problem.difficulty)}</p>
				</div>
				<div dangerouslySetInnerHTML={{ __html: problem.content }} className="mb-4"></div>
				<hr className="my-4" />
				<div className="text-center mt-4">
					<p className="text-gray-700">Author : {problem.createdBy}</p>
				</div>
			</div>
		) : (
			<div className="h-screen min-w-[300px] mx-auto p-4 overflow-y-auto">
			<p>Loading problem details...</p>
			</div>
		)}
	</>
	);
};

export default Problem;
