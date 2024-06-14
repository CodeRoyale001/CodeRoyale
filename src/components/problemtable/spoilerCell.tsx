import React, { useState } from 'react';
import { TableCell } from '../ui/table';
import * as Icon from "iconic-react";

const SpoilerCell = ({ tags }: { tags: string }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <TableCell style={{ border: "1px solid black", position: 'relative' }}>
      <pre className={`bg-background p-4 rounded-md ${!showSpoiler ? "filter blur-sm" : ""}`}>
        <code className="text-l text-foreground">
          {showSpoiler ? tags : "*****" }
        </code>
      </pre>
      {!showSpoiler && (
        <>
          <button
            className="absolute right-1 bottom-5 px-4 py-1 rounded-md text-sm font-bold text-gray-800 min-w-10"            
          >
              <Icon.EyeSlash
          size="28" color="#cf354c"
          onClick={() => setShowSpoiler(true)}

          >
          </Icon.EyeSlash>
          </button>
        </>
      )}
    </TableCell>
  );
};

export default SpoilerCell;
