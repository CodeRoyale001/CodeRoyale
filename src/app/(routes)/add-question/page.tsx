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
import { useState } from "react";

interface AddQuestionForm {
  questionDetail: QuestionDetails;
  testCases: TestCase[];
  code: string;
}

export default function QuestionFormPage() {
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

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          <QuestionNavigation setStage={setStage} />
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
          {stage === 3 && <FinalForm />}
          {console.log(formData)};
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
