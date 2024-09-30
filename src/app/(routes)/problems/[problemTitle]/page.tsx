// ProblemPage.tsx

"use client";
import { LoginWarnPopup } from "@/components/popups";
import Layout from "@/components/problem/Layout";
import { RootState } from "@/redux/store";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { useAuthenticate } from "@/lib/withAuthenticate";
import Navbar from "@/components/navbar";

interface problemPageProps {
  params: {
    problemTitle: string;
  };
}

const ProblemPage: React.FC<problemPageProps> = ({
  params,
}: {
  params: { problemTitle: string };
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [problem, setProblem] = React.useState<any>({} as ProblemDTO);
  const [error, setError] = React.useState<boolean>(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchProblemDetails();
    }
  }, [isLoggedIn]);

  const fetchProblemDetails = async () => {
    try {
      const url =
        process.env.JS_URI +
        `/api/getProblem?title=${convertToTitle(params.problemTitle)}`;
      const accessToken = getCookie("accessToken");
      getRequest(url, accessToken, (response) => {
        const newProblem = {
          ...response.data[0],
          problemId: response.data[0]._id,
        };
        setProblem(newProblem);
      });
    } catch (error) {
      console.error("Error fetching problem details:", error);
      setError(true);
      toast({
        title: "Error",
        description: "Error fetching problem details. Please try again.",
      });
    }
  };

  if (error) {
    return <div>No such Problem</div>;
  }

  const convertToTitle = (str: String) => {
    return str.replace(/-/g, " ");
  };
  return (
    <>
      <title>{convertToTitle(params.problemTitle) + "- CodeRoyale"}</title>
      {isLoggedIn ? (
        <>
          <Layout problem={problem} />
        </>
      ) : (
        <>
          <Navbar />
          <LoginWarnPopup isLoggedIn={isLoggedIn} />
        </>
      )}
    </>
  );
};

export default useAuthenticate(ProblemPage);
