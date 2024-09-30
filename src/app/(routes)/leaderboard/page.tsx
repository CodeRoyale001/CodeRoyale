"use client";

import RankingTable from "@/components/leaderboard/rankingTable";
import Navbar from "@/components/navbar";
import { LoginWarnPopup } from "@/components/popups";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <>
      <title>LeaderBoard</title>
      <Navbar />
      {isLoggedIn ? (
        <div className="pt-12 px-4 sm:px-8 md:px-16 lg:px-40">
          <RankingTable />
        </div>
      ) : (
        <div className="pt-12 px-4 sm:px-8 md:px-16 lg:px-40">
          <LoginWarnPopup isLoggedIn={isLoggedIn} />
        </div>
      )}
    </>
  );
}
