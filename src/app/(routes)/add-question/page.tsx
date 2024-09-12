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

export default function QuestionFormPage() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
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