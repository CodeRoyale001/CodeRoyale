import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"; // Import the language_tools extension
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "@/utils/cookies";
import { postRequest } from "@/utils/api";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { timeConvert } from "@/utils/utils";
import { useToast } from "@/components/ui/use-toast";

interface CodeEditorProps {
  width?: string;
  height?: string;
  problemId: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ problemId }) => {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("chrome");
  const [language, setLanguage] = useState("javascript");
  const [submissionResponse, setSubmissionResponse] = useState<SubmissionDTO>(
    {} as SubmissionDTO
  );
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [isError, setError] = useState(""); 
  // const { toast } = useToast();
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleResetCode = () => {
    setCode("");
  };
  const handleSubmit = async () => {
    setError("");
    try {
      setSubmissionLoading(true);
      const userId = getCookie("userID"); // Replace with your function to get user ID
      const postData = {
        userId,
        questionID: problemId,
        code,
        language,
      };
      const url = `${process.env.GO_URI}/submit`;
      const accessToken = getCookie("accessToken");

      await postRequest(url, postData, accessToken, (response) => {
        // Handle successful submission response (e.g., display success message)
        setSubmissionResponse(response.data);
        setSubmissionLoading(false);
      });
    } catch (error:any) {
      setSubmissionLoading(false);
      setError(error.message);
      console.error("Error submitting code:", error);
      // toast({
      //   title: "Error",
      //   description: error.message,
      // });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 bg-background">
        <div className="code-editor-option">
          <Select onValueChange={setTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="chrome">Chrome</SelectItem>
                <SelectItem value="monokai">Monokai</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="p-2"></div>
          <Select onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="C++">C++</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="js">JavaScript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleResetCode}>Reset Code</Button>
      </div>
      <div className="h-[calc(100vh-100px)] ">
        <AceEditor
          setOptions={{ useWorker: false }}
          mode={language}
          theme={theme}
          value={code}
          onChange={handleCodeChange}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width={"100%"}
          height={"100%"}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
        />
      </div>
      <div className="flex items-center p-3 pr-5 bg-background justify-end">
        <Button>Run Code</Button>
        <Dialog>
          <div className="p-2"></div>
          <DialogTrigger asChild>
            <Button onClick={handleSubmit}>Submit Code</Button>
          </DialogTrigger>
          <DialogContent>
            {submissionLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {isError.length > 0 ? (<>
                  <p className="text-red-600">Error:</p>
                  <p>{isError}</p>
                  </>
                ) : (
                  <>
                    <div>
                      Verdict:{" "}
                      <span
                        className={
                          submissionResponse.status === "CORRECT"
                            ? "bg-green-400 text-white px-1 rounded-md"
                            : "bg-red-600 text-white px-1 rounded-md"
                        }
                      >
                        {submissionResponse.status}
                      </span>
                    </div>
          
                    <p>Time: {timeConvert(submissionResponse.submitTime)}</p>
                    <p>TestCases Passed: {submissionResponse.lastExecutedIndex}</p>
                    <Button>
                      {submissionResponse.status === "CORRECT"
                        ? "Solve A Random Question"
                        : "Uh Ohh Try Again"}
                    </Button>
                  </>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CodeEditor;
