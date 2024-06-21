import React from "react";
interface ProblemProps {
	problemInfo: ProblemDTO;
}

const Problem: React.FC<ProblemProps> = ({ problemInfo }) => {
	
	const formatDifficulty = (difficulty: string) => {
		return (
			difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
		);
	};
	return (
		<>
		{problemInfo ? (
			<div className="h-content min-w-[350px] mx-auto p-4 overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">{problemInfo.title}</h2>
					<p className="text-sm text-gray-600">Difficulty : {formatDifficulty(problemInfo.difficulty)}</p>
				</div>
				<div dangerouslySetInnerHTML={{ __html: problemInfo.content }} className="mb-4"></div>
				<hr className="my-4" />
				<div className="text-center mt-4">
					<p className="text-gray-700">Author : {problemInfo.createdBy}</p>
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
