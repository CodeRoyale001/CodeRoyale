import React, { useState } from "react";
import { TableCell } from "../ui/table";
import { EyeOff } from "lucide-react";

interface SpoilerCellProps {
  tags: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const SpoilerCell: React.FC<SpoilerCellProps> = ({ tags, isOpen, onToggle }) => {

  return (
    <TableCell className="relative w-36 sm:w-44 flex items-center justify-center">
      <pre
        className={`bg-background p-1 sm:p-3 rounded-md w-full text-center ${
          !isOpen ? "filter blur-sm text-center tracking-widest" : ""
        }`}
      >
        <code className="text-xs sm:text-sm text-foreground w-max text-wrap text-center">
          {isOpen ? tags.join(", ") : "*********"}
        </code>
      </pre>
      {!isOpen && (
        <button
          className="absolute inset-0 flex items-center justify-center px-3 py-1 sm:px-5 sm:py-2"
          onClick={onToggle}
        >
          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </TableCell>
  );
};

export default SpoilerCell;
