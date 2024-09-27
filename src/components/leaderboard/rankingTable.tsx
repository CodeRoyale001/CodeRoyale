"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { PaginationSection } from "../paginations/pagination";
const leaderboard = [
  {
    rank: 1,
    username: "Adminn",
    country: "USA",
    contests: 50,
    totalQuestions: 500,
    rating: 2500,
  },
  {
    rank: 2,
    username: "chessMaster",
    country: "Russia",
    contests: 48,
    totalQuestions: 480,
    rating: 2450,
  },
  {
    rank: 3,
    username: "grandMaster",
    country: "China",
    contests: 47,
    totalQuestions: 470,
    rating: 2400,
  },
  {
    rank: 4,
    username: "playerOne",
    country: "India",
    contests: 45,
    totalQuestions: 450,
    rating: 2350,
  },
  {
    rank: 5,
    username: "queenGambit",
    country: "UK",
    contests: 44,
    totalQuestions: 440,
    rating: 2300,
  },
  {
    rank: 6,
    username: "knightRider",
    country: "Germany",
    contests: 42,
    totalQuestions: 420,
    rating: 2250,
  },
  {
    rank: 7,
    username: "rookie",
    country: "Brazil",
    contests: 41,
    totalQuestions: 410,
    rating: 2200,
  },
  {
    rank: 8,
    username: "bishopKing",
    country: "France",
    contests: 40,
    totalQuestions: 400,
    rating: 2150,
  },
  {
    rank: 9,
    username: "pawnStar",
    country: "Spain",
    contests: 39,
    totalQuestions: 390,
    rating: 2100,
  },
  {
    rank: 10,
    username: "castleMaster",
    country: "Italy",
    contests: 38,
    totalQuestions: 380,
    rating: 2050,
  },
  {
    rank: 11,
    username: "checkMate",
    country: "Netherlands",
    contests: 37,
    totalQuestions: 370,
    rating: 2000,
  },
  {
    rank: 12,
    username: "chessChamp",
    country: "Canada",
    contests: 36,
    totalQuestions: 360,
    rating: 1950,
  },
  {
    rank: 13,
    username: "boardWizard",
    country: "Australia",
    contests: 35,
    totalQuestions: 350,
    rating: 1900,
  },
  {
    rank: 14,
    username: "queenSacrifice",
    country: "Argentina",
    contests: 34,
    totalQuestions: 340,
    rating: 1850,
  },
  {
    rank: 15,
    username: "kingFisher",
    country: "Norway",
    contests: 33,
    totalQuestions: 330,
    rating: 1800,
  },
  {
    rank: 16,
    username: "pawnStorm",
    country: "Sweden",
    contests: 32,
    totalQuestions: 320,
    rating: 1750,
  },
  {
    rank: 17,
    username: "rookieMistake",
    country: "Japan",
    contests: 31,
    totalQuestions: 310,
    rating: 1700,
  },
  {
    rank: 18,
    username: "bishopStrike",
    country: "South Korea",
    contests: 30,
    totalQuestions: 300,
    rating: 1650,
  },
  {
    rank: 19,
    username: "knightWatch",
    country: "Mexico",
    contests: 29,
    totalQuestions: 290,
    rating: 1600,
  },
  {
    rank: 20,
    username: "endGameMaster",
    country: "South Africa",
    contests: 28,
    totalQuestions: 280,
    rating: 1550,
  },
];
const RankingTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastItemInex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemInex - itemsPerPage;
  const leaderboards = leaderboard.slice(firstItemIndex, lastItemInex);

  const getRatingColor = (rating: number) => {
    if (rating > 2300) return "text-red-500";
    if (rating > 1900) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <>
      <div className="flex justify-center rounded-md border mb-10 overflow-x-auto bg-card">
        <Table className="w-full mx-auto table-auto min-w-[640px]">
          <TableHeader>
            <TableRow className="h-12 sm:h-14 md:h-16 lg:h-20"> {/* Responsive row height */}
              <TableHead className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg text-center w-1/12">
                Rank
              </TableHead>
              <TableHead className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg w-3/12">
                Username
              </TableHead>
              <TableHead className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg text-center w-2/12">
                Country
              </TableHead>
              <TableHead className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg text-center w-2/12">
                Rating
              </TableHead>
              <TableHead className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg text-center w-2/12">
                Contests
              </TableHead>
              <TableHead className="px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg text-center w-2/12">
                Total Questions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboards.map((user: any) => (
              <TableRow key={user.rank} className="h-12 sm:h-14 md:h-16"> {/* Responsive row height */}
                <TableCell className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg text-center">
                  {user.rank}
                </TableCell>
                <TableCell className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg">
                  <Link
                    href={`/u/${user.username}`}
                    className="hover:font-bold transition duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg text-center">
                  {user.country}
                </TableCell>
                <TableCell
                  className={`px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg text-center ${getRatingColor(
                    user.rating
                  )}`}
                >
                  {user.rating}
                </TableCell>
                <TableCell className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg text-center">
                  {user.contests}
                </TableCell>
                <TableCell className="px-2 py-1 text-xs sm:text-sm md:text-base lg:text-lg text-center">
                  {user.totalQuestions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mb-10">
        <PaginationSection
          totalItems={leaderboard.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default RankingTable;