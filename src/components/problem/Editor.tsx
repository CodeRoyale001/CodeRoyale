import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getCookie } from "@/utils/cookies";
import { postRequest } from "@/utils/api";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { formatTimestamp } from "@/utils/utils";
import { useTheme } from 'next-themes';

interface CodeEditorProps {
	width?: string;
	height?: string;
	problemId: string;
}
const languageModeMap: { [key: string]: string } = {
	"C++": "c_cpp",
	C: "c_cpp",
	Java: "java",
	JavaScript: "javascript",
	Python: "python",
};
const CodeEditor: React.FC<CodeEditorProps> = ({ problemId }) => {
	const [code, setCode] = useState("");
	const [size, setSize] = useState(18);
  const { theme, resolvedTheme } = useTheme();
  const isDarkMode = theme === 'dark' || resolvedTheme === 'dark';

  const [mytheme, setTheme] = useState("chrome");
  useEffect(() => {
    setTheme(isDarkMode ? "terminal" : "chrome");
  }, [isDarkMode]);



	const [language, setLanguage] = useState("none");
	const [submissionResponse, setSubmissionResponse] = useState<SubmissionDTO>(
		{} as SubmissionDTO
	);
	const [submissionLoading, setSubmissionLoading] = useState(false);
	const [isError, setError] = useState("");
	const { toast } = useToast();

  const textSizes = Array.from({ length: (32 - 12) / 2 + 1 }, (_, i) => 12 + i * 2);

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	const handleResetCode = () => {
		setCode("");
	};
	const handleSubmit = async () => {
		if (language === "none") {
			setError("Please select a Language to submit your code");
			return;
		}
		setError("");
		try {
			setSubmissionLoading(true);
			const userId = getCookie("userName"); // Replace with your function to get user ID
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
			});
		} catch (error: any) {
			setSubmissionLoading(false);
			setError(error.message);
		} finally {
			setSubmissionLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between p-2 bg-background">
				<div className="code-editor-option">
					<Select onValueChange={setTheme}>
						<SelectTrigger className="w-[150px]">
							<SelectValue placeholder="Select Theme" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
              <SelectLabel>Light Themes</SelectLabel>
								<SelectItem value="chrome">Chrome</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="solarized_light">Solarized</SelectItem>
                </SelectGroup>
                <SelectGroup>
                <SelectLabel>Dark Themes</SelectLabel>
								<SelectItem value="monokai">Monokai</SelectItem>
                <SelectItem value="terminal">Terminal</SelectItem>
                <SelectItem value="chaos">Chaos</SelectItem>
                <SelectItem value="github_dark">GitHub Dark</SelectItem>
                <SelectItem value="gob">Green on Black</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="p-2"></div>

					<Select onValueChange={setLanguage}>
						<SelectTrigger className="w-[150px]">
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
					<div className="p-2"></div>
					<Select onValueChange={(value) => setSize(Number(value))}>
						<SelectTrigger className="w-[70px]">
							<SelectValue placeholder={size} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
              {textSizes.map((textSize) => (
              <SelectItem key={textSize} value={textSize.toString()}>{textSize}</SelectItem>
            ))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button >Reset Code</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
              You are about to reset the code. This action is irreversible and will delete all your changes.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleResetCode}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
			<div className="h-[calc(100vh-100px)] ">
				<AceEditor
					setOptions={{ useWorker: false, customScrollbar: true }}
					mode={languageModeMap[language]}
					theme={mytheme}
					value={code}
					onChange={handleCodeChange}
          wrapEnabled={true}
					name="code-editor"
					editorProps={{ $blockScrolling: true }}
					width={"100%"}
					height={"100%"}
					fontSize={size}
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
								{isError.length > 0 ? (
									<>
										<p className="text-red-600">Error: </p>
										<p>{isError}</p>
									</>
								) : (
									<>
										<div>
											Verdict:{" "}
											<span
												className={
													submissionResponse.status ===
													"CORRECT"
														? "bg-green-400 text-white px-1 rounded-md"
														: "bg-red-600 text-white px-1 rounded-md"
												}
											>
												{submissionResponse.status}
											</span>
										</div>

										<p>
											Time:{" "}
											{formatTimestamp(
												submissionResponse.submitTime
											)}
										</p>
										<p>
											TestCases Passed:{" "}
											{submissionResponse.lastExecutedIndex -
												1}
										</p>
										<Button>
											{submissionResponse.status ===
											"CORRECT"
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
