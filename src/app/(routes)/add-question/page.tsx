"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navbar";
import AddQuestionForm from "@/components/addQuestion/addQuestionForm";
import { LoginWarnPopup } from "@/components/popups";
import QuestionNavigation from "@/components/addQuestion/nav";
import { useState } from "react";
import TestCaseForm from "@/components/addQuestion/testCaseForm";
import CodeForm from "@/components/addQuestion/codeForm";
import { Button } from "@/components/ui/button";

interface AddQuestionData {
  QuestionData: {
    title: string;
    difficulty: string;
    content: string;
    tags: string[];
  };
  TestCases: {
    testCase: { input: string; output: string }[];
  };
}

export default function QuestionFormPage() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [QuestionData, setQuestionData] = useState<AddQuestionData>({
    QuestionData: {
      title: "",
      difficulty: "",
      content: "",
      tags: []
    },
    TestCases: {
      testCase: []
    }
  });
  const [stage, setStage] = useState(0);
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          <QuestionNavigation setStage={setStage} />
          {stage === 0 && <AddQuestionForm setStage={setStage} />}
          {stage === 1 && <TestCaseForm />}
          {stage === 2 && <CodeForm problemTitle={"Sample"} />}
          <Button>Submit Question</Button>
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
