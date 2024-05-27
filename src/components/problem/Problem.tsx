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

	const fetchProblemDetails = async () => {
		try {
			const url = process.env.JS_URI + `/api/getProblem?title=${problemTitle}`;
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
				<div>
					<div>
						<h2>Title : {problem.title}</h2>
					</div>
					<div>
						<p>Tags : {problem.tags}</p>
					</div>
					<div>
            <p>Problem Statement : </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: problem.content }} />
					<hr />
					<div>
						<p>Author : {problem.authors}</p>
					</div>
				</div>
			) : (
				<p>Loading problem details...</p>
			)}
		</>
	);
};

export default Problem;
