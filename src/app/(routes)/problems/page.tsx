"use client";

import Navbar from "@/components/navbar";
import ProblemTable from "@/components/problemtable/Problem";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Problems() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <>
      <title>Problems</title>
      <Navbar />
      {isLoggedIn ? (
        <div className="pt-12 px-4 sm:px-8 md:px-16 lg:px-40">
          <ProblemTable />
        </div>
      ) : (
        <div className="pt-12 px-4 sm:px-8 md:px-16 lg:px-40">
          <LoginWarnPopup isLoggedIn={isLoggedIn} />
        </div>
      )}
    </>
  );
}
