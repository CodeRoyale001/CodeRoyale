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
     <Table style={{ maxWidth: "100vw", border: "1px solid black" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="border border-black min-w-1">Rank</TableHead>
            <TableHead className="border border-black w-3/4">
              Username
            </TableHead>
            <TableHead className="border border-black">
              Country
            </TableHead>
            <TableHead className="border border-black">
              Rating
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboards.map((user: any, index: number) => (
            <TableRow key={user.rank}>
              <TableCell style={{ border: "1px solid black" }}>
                {user.rank}
              </TableCell>
              <TableCell style={{ border: "1px solid black" }}>
                <Link
                  href={`/u/${user.username}`}
                >
                  {user.username}
                </Link>
              </TableCell>
              <TableCell style={{ border: "1px solid black" }}>
                {user.country}
              </TableCell>
              <TableCell style={{ border: "1px solid black" }}>
                {user.rating}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
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