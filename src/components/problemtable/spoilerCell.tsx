import React, { useState } from "react";
import { TableCell } from "../ui/table";
import * as Icon from "iconic-react";

const SpoilerCell = ({ tags }: { tags: string[] }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <TableCell className="relative w-44">
      <pre
        className={`bg-background p-3 rounded-md ${!showSpoiler ? "filter blur-sm" : ""}`}
      >
        <code className="text-sm text-foreground w-max text-wrap">
          {showSpoiler ? tags.join(", ") : "*****"}
        </code>
      </pre>
      {!showSpoiler && (
        <>
          <button
            className="absolute right-1 bottom-4 px-5 py-1 text-sm min-w-10"
            onClick={() => setShowSpoiler(true)}
          >
            <Icon.EyeSlash size="24" color="#cf354c" />
          </button>
        </>
      )}
    </TableCell>
  );
};

export default SpoilerCell;
