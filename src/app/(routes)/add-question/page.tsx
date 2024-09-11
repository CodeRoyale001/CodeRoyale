"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navbar";
import AddQuestionForm from "@/components/forms/addQuestionForm";
import { LoginWarnPopup } from "@/components/popups";

export default function QuestionFormPage() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="pt-12 w-full flex justify-center items-center min-h-screen">
            <AddQuestionForm />
          </div>
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