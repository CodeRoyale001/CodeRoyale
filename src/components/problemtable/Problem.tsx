import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import { PaginationSection } from "../paginations/pagination";
import SpoilerCell from "./spoilerCell";
const ProblemTable: React.FC = () => {
  const [problems, setProblems] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const url = process.env.JS_URI + "/api/getProblem";
      const accessToken = getCookie("accessToken");
      if (accessToken.length === 0) {
        // use effect
        alert("Please Login");
      } else {
        await getRequest(url, accessToken, (response) => {
          setProblems(response);
        });
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };
  if (!problems) {
    return <p>Loading all the problems...</p>;
  }
  const lastItemInex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemInex - itemsPerPage;
  const currentProblems = problems.slice(firstItemIndex, lastItemInex);

  const convertProblemName = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <>
      <Table style={{ maxWidth: "100vw", border: "1px solid black" }}>
        <TableHeader>
          <TableRow>
            <TableHead className="border border-black min-w-1">Sr. No.</TableHead>
            <TableHead className="border border-black w-3/4">
              Problem Name
            </TableHead>
            <TableHead className="border border-black">
              Tags
            </TableHead>
            <TableHead className="border border-black">
              Difficulty
            </TableHead>
            <TableHead className="border border-black">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProblems.map((currentProblem: any, index: number) => (
            <TableRow key={currentProblem.id}>
              <TableCell style={{ border: "1px solid black" }}>
                {index + 1}
              </TableCell>
              <TableCell style={{ border: "1px solid black" }}>
                <Link
                  href={`/problems/${encodeURIComponent(
                    convertProblemName(currentProblem.title)
                  )}`}
                >
                  {currentProblem.title[0].toUpperCase()+currentProblem.title.slice(1)}
                </Link>
              </TableCell>
             <SpoilerCell tags={currentProblem.tags} />
              <TableCell style={{ border: "1px solid black" }}>
                <span style={{ color: currentProblem.difficulty.toLowerCase() === "easy" ? "green" : currentProblem.difficulty === "medium" ? "yellow" : "red" }}>
                  {currentProblem.difficulty[0].toUpperCase() + currentProblem.difficulty.slice(1)}
                </span>
              </TableCell>
              <TableCell style={{ border: "1px solid black" }}>
                Solved
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationSection
        totalItems={problems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ProblemTable;
