"use client"
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Link from 'next/link';
import { PaginationSection } from '../paginations/pagination';
const leaderboard = [
  {
    rank: 1,
    username: "Adminn",
    country: "USA",
    rating: 2500
  },
  {
    rank: 2,
    username: "chessMaster",
    country: "Russia",
    rating: 2450
  },
  {
    rank: 3,
    username: "grandMaster",
    country: "China",
    rating: 2400
  },
  {
    rank: 4,
    username: "playerOne",
    country: "India",
    rating: 2350
  },
  {
    rank: 5,
    username: "queenGambit",
    country: "UK",
    rating: 2300
  },
  {
    rank: 6,
    username: "knightRider",
    country: "Germany",
    rating: 2250
  },
  {
    rank: 7,
    username: "rookie",
    country: "Brazil",
    rating: 2200
  },
  {
    rank: 8,
    username: "bishopKing",
    country: "France",
    rating: 2150
  },
  {
    rank: 9,
    username: "pawnStar",
    country: "Spain",
    rating: 2100
  },
  {
    rank: 10,
    username: "castleMaster",
    country: "Italy",
    rating: 2050
  },
  {
    rank: 11,
    username: "checkMate",
    country: "Netherlands",
    rating: 2000
  },
  {
    rank: 12,
    username: "chessChamp",
    country: "Canada",
    rating: 1950
  },
  {
    rank: 13,
    username: "boardWizard",
    country: "Australia",
    rating: 1900
  },
  {
    rank: 14,
    username: "queenSacrifice",
    country: "Argentina",
    rating: 1850
  },
  {
    rank: 15,
    username: "kingFisher",
    country: "Norway",
    rating: 1800
  },
  {
    rank: 16,
    username: "pawnStorm",
    country: "Sweden",
    rating: 1750
  },
  {
    rank: 17,
    username: "rookieMistake",
    country: "Japan",
    rating: 1700
  },
  {
    rank: 18,
    username: "bishopStrike",
    country: "South Korea",
    rating: 1650
  },
  {
    rank: 19,
    username: "knightWatch",
    country: "Mexico",
    rating: 1600
  },
  {
    rank: 20,
    username: "endGameMaster",
    country: "South Africa",
    rating: 1550
  }
];



const RankingTable = () => {
    // const [problems, setProblems] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const lastItemInex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemInex - itemsPerPage;
  const leaderboards = leaderboard.slice(firstItemIndex, lastItemInex);
  return (
    <>
    			<div className="flex justify-center px-20 py-5">
     <Table className="w-full max-w-[60%] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="border border-black w-2/12 text-center">Rank</TableHead>
            <TableHead className="border border-black w-5/12 ">
              Username
            </TableHead>
            <TableHead className="border border-black w-3/12 ">
              Country
            </TableHead>
            <TableHead className="border border-black w-2/12 text-center">
              Rating
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboards.map((user: any, index: number) => (
            <TableRow key={user.rank}>
              <TableCell className="border border-black text-center">
                {user.rank}
              </TableCell>
              <TableCell className="border border-black">
                <Link
                  href={`/u/${user.username}`}
                  className="hover:font-bold transition duration-300 ease-in-out transform hover:-translate-y-1"

                >
                  {user.username}
                </Link>
              </TableCell>
              <TableCell className="border border-black">
                {user.country}
              </TableCell>
              <TableCell className="border border-black">
                {user.rating}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </div>
        <PaginationSection
        totalItems={leaderboard.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default RankingTable