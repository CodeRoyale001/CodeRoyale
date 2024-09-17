import React, { useState } from "react";
import { CodeEditor } from "@/components/problem";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
interface CodeFormProps {
  setStage: (stage: number) => void;
  problemTitle: string;
  code: string;
  setParentCode: (code: string) => void;
}

const CodeForm: React.FC<CodeFormProps> = ({ setStage, problemTitle,code,setParentCode }) => {
  const [open, setOpen] = useState(false); // Controls the AlertDialog

  const handleNextClick = () => {
    if (code.trim() === "") {
      return;
    }
    setOpen(true);
  };

  const handleProceed = () => {
    console.log(code);
    setParentCode(code);
    setStage(3);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-5xl text-primary dark:text-primary my-6">
        Add Your Code
      </h1>
      <div className="hidden sm:block sm:w-[650px] lg:w-[850px] bg-white border-2 mb-5 border-black/15 dark:bg-background dark:border-white/15 rounded-lg shadow-xl p-8">
        <CodeEditor
          problemId={problemTitle}
          mode="EDITOR"
          editorheight="h-[calc(100vh-500px)]"
          setParentCode={setParentCode}
        />
        {/* Next Button */}
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            onClick={handleNextClick}
            disabled={code.trim() === ""}
          >
            Next Step
          </Button>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed to the Next Step?</AlertDialogTitle>
            <AlertDialogDescription>
              You won't be able to modify your code after proceeding. Please
              review it carefully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceed}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CodeForm;
