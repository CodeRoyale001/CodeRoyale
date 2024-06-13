import React, { useState } from 'react';
import { TableCell } from '../ui/table';

const SpoilerCell = ({ tags }: { tags: string }) => {
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <TableCell style={{ border: "1px solid black", position: 'relative' }}>
      <pre className={`bg-background p-4 rounded-md ${!showSpoiler ? "filter blur-sm" : ""}`}>
        <code className="text-l text-foreground">
          {tags}
        </code>
      </pre>
      {!showSpoiler && (
        <>
          <button
            className="absolute right-1/3 bottom-5 bg-gray-300 px-3 py-1 rounded-md text-sm font-bold text-gray-800 min-w-10"
            onClick={() => setShowSpoiler(true)}
          >
            Show Tags
          </button>
        </>
      )}
    </TableCell>
  );
};

export default SpoilerCell;
