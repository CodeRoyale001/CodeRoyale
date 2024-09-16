"use client";

import RankingTable from "@/components/leaderboard/rankingTable";
import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import Head from "next/head";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <>
      <title>LeaderBoard</title>
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className="pt-12 px-40">
            <RankingTable />
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
