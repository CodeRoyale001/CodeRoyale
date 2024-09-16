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
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="pt-12 px-40">
            <ProblemTable />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <LoginWarnPopup isLoggedIn={isLoggedIn} />
        </>
      )}
    </>
  );
}
