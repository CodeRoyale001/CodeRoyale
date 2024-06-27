"use client"

import { LoginWarnPopup } from "@/components/popups";
import Layout from "@/components/problem/Layout";
import { RootState } from "@/redux/store";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import React from "react";
import { useSelector } from "react-redux";

const ProblemPage = ({ params }: { params: { problemTitle: string } }) => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user);
    const [problem, setProblem] = React.useState<any>({}as ProblemDTO);
	const [error, setError] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (isLoggedIn){
		fetchProblemDetails();
		}
	}, [isLoggedIn]);

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
	console.log(isLoggedIn);
	
    const convertToTitle = (str: String) => {
        return str.replace(/-/g, ' ');
    };
    return isLoggedIn?<Layout problem={problem} />:<LoginWarnPopup />;
};

export default ProblemPage;
