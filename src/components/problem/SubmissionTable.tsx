import React, { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
                        header.getContext(),
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
              onClick={() => {
                setCode(row.original.code);
                setOpen(true);
              }}
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

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Submitted Code</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="max-h-96 overflow-y-auto">
                <pre>{code}</pre>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubmissionTable;
