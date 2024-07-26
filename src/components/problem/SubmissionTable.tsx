import React from "react";
import { timeConvert } from "@/utils/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SubmissionTableProps {
  submissions: SubmissionDTO[];
}

const columns: ColumnDef<SubmissionDTO>[] = [
  {
    id: "id",
    header: "Submission Id",
    accessorKey: "_id",
  },

  {
    id: "language",
    header: "Language",
    accessorKey: "language",
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
  },
  {
    id: "time",
    header: "Submission Time",
    accessorKey: "submitTime",
    cell: ({ getValue }) => {
      const time = getValue() as string;
      return timeConvert(time);
    },
  },
];

const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions }) => {
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-md w-full flex items-center justify-center">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer"
              onClick={() => console.log(row.original.code)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmissionTable;
