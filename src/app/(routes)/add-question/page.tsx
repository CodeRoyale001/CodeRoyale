"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navbar";
import {
  AddQuestionForm as AddQuestionComponent,
  CodeForm,
  TestCaseForm,
  FinalForm,
} from "@/components/addQuestion";
import { LoginWarnPopup } from "@/components/popups";
import QuestionNavigation from "@/components/addQuestion/nav";
import { use, useState } from "react";
import { postRequest } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { getCookie } from "@/utils/cookies";

interface AddQuestionForm {
  questionDetail: QuestionDetails;
  testCases: TestCase[];
  code: string;
}

export default function QuestionFormPage() {
  const {toast} = useToast();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  // Centralized state for all form data
  const [formData, setFormData] = useState<AddQuestionForm>({
    questionDetail: {} as QuestionDetails,
    testCases: [],
    code: "",
  });

  const [stage, setStage] = useState(0);

  // Handler to update any part of the form data
  const updateFormData = (newData: Partial<AddQuestionForm>) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handlesubmit =async ()=>{
    try{
    const url =`${process.env.JS_URI}/api/createProblem`
    const accessToken = getCookie("accessToken")
    await postRequest(url, {
      questionDetail: JSON.stringify(formData.questionDetail),
      testCases: JSON.stringify(formData.testCases),
      code: formData.code,
    }, accessToken, (response) => {
      toast({
        title:"Success",
        description:"Question added successfully",
      })
    })
  }catch(error){
    toast({
      title:"Error",
      description:`Error : ${(error as Error).message}`,
      variant:"destructive"
    })
  }
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          {/* <QuestionNavigation setStage={setStage} /> */}
          {stage === 0 && (
            <AddQuestionComponent
              setStage={setStage}
              setQuestionDetail={(questionDetail: QuestionDetails) =>
                updateFormData({ questionDetail })
              }
            />
          )}
          {stage === 1 && (
            <TestCaseForm
              setStage={setStage}
              testCases={formData.testCases}
              setTestCases={(testCases: TestCase[]) =>
                updateFormData({ testCases })
              }
            />
          )}
          {stage === 2 && (
            <CodeForm
              problemTitle={"Sample"}
              setStage={setStage}
              code={formData.code}
              setParentCode={(code: string) => updateFormData({ code })}
            />
          )}
          {stage === 3 && <FinalForm handleFormSubmision={handlesubmit}  />}
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
