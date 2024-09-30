import React, { useEffect, useState } from "react";
import { Problem, columns } from "./columns";
import { getRequest } from "@/utils/api";
import { getCookie } from "@/utils/cookies";
import SkeletonTable from "./skeletonTable";
import { DataTable } from "../ui/data-table";

const ProblemTable: React.FC = () => {
  const [problems, setProblems] = useState<any>(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const url = process.env.JS_URI + "/api/getProblem";
      const accessToken = getCookie("accessToken");
      if (accessToken.length === 0) {
        // use effect
      } else {
        await getRequest(url, accessToken, (response) => {
          setProblems(response?.data);
        });
      }
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  if (!problems) {
    return <SkeletonTable />;
  }

  return <DataTable columns={columns} data={problems} />;
};

export default ProblemTable;
