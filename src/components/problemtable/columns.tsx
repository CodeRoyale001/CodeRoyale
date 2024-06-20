"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SpoilerCell from "./spoilerCell";

export type Problem = {
	id: number;
	title: string;
	status: "Solved" | "Unsolved" | "Attempted";
	difficulty: "Easy" | "Medium" | "Hard";
	tags: string[];
};

// Difficulty order mapping for sorting
const difficultyOrder = {
	Easy: 1,
	Medium: 2,
	Hard: 3,
};

// Status order mapping for sorting
const statusOrder = {
	Solved: 1,
	Attempted: 2,
	Unsolved: 3,
};

// Function to format difficulty
const formatDifficulty = (difficulty: string) => {
	return (
		difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
	);
};

const convertProblemName = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
};

export const columns: ColumnDef<Problem>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<div
					className="text-center cursor-pointer h-10 flex items-center justify-center"
					onClick={() => {
						if (column.getIsSorted() !== "asc") {
							column.toggleSorting(false); // Ensure sorting is only ascending
						}
					}}
				>
					Sr. No.
				</div>
			);
		},
		cell: ({ row }) => {
			return <div className="text-center">{row.index + 1}</div>;
		},
		sortingFn: (rowA, rowB) => {
			return rowA.index - rowB.index;
		},
		size: 1/12 * 100,
	},
	{
		accessorKey: "title",
		header: () => {
			return (
				<div className="h-10 flex items-center">
					Problem Name
				</div>
			);
		},
		cell: ({ row }) => {
			const title = row.getValue("title") as string;
			return (
				<Link
					href={`/problems/${encodeURIComponent(
						convertProblemName(title)
					)}`}
					className="hover:font-bold transition duration-300 ease-in-out transform hover:-translate-y-1"
				>
					{title.charAt(0).toUpperCase() + title.slice(1)}
				</Link>
			);
		},
		size: 5/12 * 100,
	},
	{
		accessorKey: "tags",
		header: () => {
			return (
				<div className="text-center h-10 flex items-center justify-center">
					Tags
				</div>
			);
		},
		cell: ({ row }) => {
			const tags = row.getValue("tags") as string[];
			return (
				<div className="text-center flex items-center justify-center">
					<SpoilerCell tags={tags} />
				</div>
			);
		},
		size: 2/12 * 100,
	},
	{
		accessorKey: "difficulty",
		header: ({ column }) => {
			return (
				<div className="text-center h-10 flex items-center justify-center">
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
					>
						Difficulty
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			const difficulty = row.getValue("difficulty") as string;
			const formattedDifficulty = formatDifficulty(difficulty);
			const difficultyClass =
				formattedDifficulty.toLowerCase() === "easy"
					? "text-green-500"
					: formattedDifficulty.toLowerCase() === "medium"
					? "text-yellow-500"
					: "text-red-500";
			return <div className={`text-center ${difficultyClass}`}>{formattedDifficulty}</div>;
		},
		sortingFn: (rowA, rowB) => {
			const difficultyA = formatDifficulty(rowA.original.difficulty);
			const difficultyB = formatDifficulty(rowB.original.difficulty);
			return (
				difficultyOrder[difficultyA as keyof typeof difficultyOrder] -
				difficultyOrder[difficultyB as keyof typeof difficultyOrder]
			);
		},
		size: 2/12 * 100,
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<div className="text-center h-10 flex items-center justify-center">
					<Button
						variant="ghost"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
					>
						Status
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return <div className="text-center">{status}</div>;
		},
		sortingFn: (rowA, rowB) => {
			const statusA = rowA.original.status;
			const statusB = rowB.original.status;
			return (
				statusOrder[statusA as keyof typeof statusOrder] -
				statusOrder[statusB as keyof typeof statusOrder]
			);
		},
		size: 2/12 * 100,
	},
];
