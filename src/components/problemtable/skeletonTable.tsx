import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationSection } from "../paginations/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHeader,
	TableHead,
} from "@/components/ui/table";

const SkeletonTable: React.FC = () => {
	return (
		<>
			<div className="flex justify-center px-20 py-5">
				<Table className="w-full max-w-[70%] mx-auto">
					<TableHeader>
						<TableRow>
							<TableHead className="border border-black w-1/12 text-center">
								<Skeleton className="h-6" />
							</TableHead>
							<TableHead className="border border-black w-5/12">
								<Skeleton className="h-6" />
							</TableHead>
							<TableHead className="border border-black w-2/12">
								<Skeleton className="h-6" />
							</TableHead>
							<TableHead className="border border-black w-2/12 text-center">
								<Skeleton className="h-6" />
							</TableHead>
							<TableHead className="border border-black w-2/12 text-center">
								<Skeleton className="h-6" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 10 }).map((_, index) => (
							<TableRow>
								<TableCell className="border border-black text-center">
									<Skeleton className="h-12" />
								</TableCell>
								<TableCell className="border border-black">
									<Skeleton className="h-12" />
								</TableCell>
								<TableCell className="border border-black text-center">
									<Skeleton className="h-12" />
								</TableCell>
								<TableCell className="border border-black text-center">
									<Skeleton className="h-12" />
								</TableCell>
								<TableCell className="border border-black text-center">
									<Skeleton className="h-12" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<PaginationSection
				totalItems={40}
				itemsPerPage={10}
				currentPage={1}
				setCurrentPage={2}
			/>
		</>
	);
};

export default SkeletonTable;
