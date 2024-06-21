"use client"

import Layout from "@/components/problem/Layout";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import React from "react";

const ProblemPage = ({ params }: { params: { problemTitle: string } }) => {
    const [problem, setProblem] = React.useState<any>({}as ProblemDTO);
	const [error, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		fetchProblemDetails();
	}, []);

	const fetchProblemDetails = async () => {
		try {
			const url =
				process.env.JS_URI + `/api/getProblem?title=${convertToTitle(params.problemTitle)}`;
			const accessToken = getCookie("accessToken");
			getRequest(url, accessToken, (response) => {
                const newProblem={
                    ...response,
                    problemId:response._id
                }
				setProblem(newProblem);
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

    const convertToTitle = (str: String) => {
        return str.replace(/-/g, ' ');
    };
    return <Layout problem={problem} />;
};

export default ProblemPage;
