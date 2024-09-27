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
      <div className="rounded-md border mb-10 bg-card overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 text-center">
                <Skeleton className="h-6" />
              </TableHead>
              <TableHead className="w-5/12">
                <Skeleton className="h-6" />
              </TableHead>
              <TableHead className="w-2/12 text-center">
                <Skeleton className="h-6" />
              </TableHead>
              <TableHead className="w-2/12 text-center">
                <Skeleton className="h-6" />
              </TableHead>
              <TableHead className="w-2/12 text-center">
                <Skeleton className="h-6" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Skeleton className="h-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-12" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-12" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-12" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-12" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-40">
        <PaginationSection
          totalItems={40}
          itemsPerPage={10}
          currentPage={1}
          setCurrentPage={() => {}}
        />
      </div>
    </>
  );
};

export default SkeletonTable;
