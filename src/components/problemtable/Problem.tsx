import React, { useEffect, useState } from "react";
import { Problem, columns } from "./columns"
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
import SkeletonTable from "./skeletonTable";
import { DataTable } from "../ui/data-table";

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
		return <SkeletonTable />;
	}

	const lastItemIndex = currentPage * itemsPerPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const currentProblems = problems.slice(firstItemIndex, lastItemIndex);

	const convertProblemName = (title: string) => {
		return title.toLowerCase().replace(/\s+/g, "-");
	};

	return (
		<DataTable  columns={columns} data={problems}/>
	);
};

export default ProblemTable;


