import React from "react";
import MarkdownPreview from "../editor/mdPreview";
interface ProblemProps {
  problemInfo: ProblemDTO;
}

const capitalizeTitle = (questionTile: string | undefined) =>{
  if (!questionTile) return "";
   return questionTile.replace(/\b\w/g, (char) => char.toUpperCase());
}
const Problem: React.FC<ProblemProps> = ({ problemInfo }) => {
  const formatDifficulty = (difficulty: string) => {
    return (
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
    );
  };
  return (
    <>
      {problemInfo ? (
        <div className="h-content min-w-[350px] mx-auto p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{capitalizeTitle(problemInfo.title)}</h2>
            <p className="text-sm text-gray-600">
              Difficulty :{" "}
              {problemInfo.difficulty
                ? formatDifficulty(problemInfo.difficulty)
                : " "}
            </p>
          </div>
          <MarkdownPreview content={problemInfo.content} />
          <hr className="my-4" />
          <div className="text-center mt-4">
            <p className="text-gray-700">Author : {problemInfo.createdBy}</p>
          </div>
        </div>
      ) : (
        <div className="h-screen min-w-[300px] mx-auto p-4 overflow-y-auto">
          <p>Loading problem details...</p>
        </div>
      )}
    </>
  );
};

export default Problem;
