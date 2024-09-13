"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navbar";
import AddQuestionForm from "@/components/addQuestion/addQuestionForm";
import { LoginWarnPopup } from "@/components/popups";
import QuestionNavigation from "@/components/addQuestion/nav"
import { useState } from "react";
import TestCaseForm from "@/components/addQuestion/testCaseForm";
import CodeForm from "@/components/addQuestion/codeForm";
// import { useToast } from "@/components/ui/use-toast";
// import { getRequest } from "@/utils/api";
// import { getCookie } from '@/utils/cookies';


export default function QuestionFormPage() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
	// const [userRole, setUserRole] = useState<Number>(0);
  // const [error, setError] = useState<Boolean> (false);
  
  // const { toast } = useToast();

  // const fetchUserRole = async (accessToken : string) => {
	// 	try {
	// 		const url =
	// 			process.env.JS_URI + `/user/getUserRole`;

	// 		getRequest(url, accessToken, (response) => {
  //       console.log(response);
	// 			setUserRole(response);
	// 		});
	// 	} catch (error) {
	// 		console.error("Error :", error);
	// 		setError(true);
	// 		toast({
	// 			title: "Error",
	// 			description:
	// 				"Error Authorizing the User",
	// 		});
	// 	}
	// };

  // useEffect(() => {
  //   const accessToken = getCookie("accessToken");
  //   console.log(accessToken);
  //   fetchUserRole(accessToken);
  // }, [fetchUserRole]);

  const [stage,setStage]=useState(0);
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          <QuestionNavigation setStage={setStage} />
          {stage === 0 && <AddQuestionForm setStage={setStage} />}
          {stage === 1 && <TestCaseForm/>}
          {stage === 2 && <CodeForm problemTitle={"Sample"} />}
        </>
      ) : (
        <>
          <Navbar />
          <LoginWarnPopup isLoggedIn={isLoggedIn} />
        </>
      )}
    </div>
  );
}