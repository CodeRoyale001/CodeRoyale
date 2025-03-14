import React, { useState, useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Cross1Icon } from "@radix-ui/react-icons";

const testCaseSchema = z
  .object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
  })
  .strict();

const TestCaseForm = ({
  setStage,
  setTestCases,
  testCases,
}: {
  setStage: (stage: number) => void;
  setTestCases: (testcases: TestCase[]) => void;
  testCases: TestCase[];
}) => {
  const [open, setOpen] = useState(false); // Controls the AlertDialog
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const testCaseForm = useForm<z.infer<typeof testCaseSchema>>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: {} as TestCase,
  });

  // Append new test case to the existing testCases array
  const addTestCase = (data: TestCase) => {
    setTestCases([...testCases, data]);
    testCaseForm.reset();
    testCaseForm.setValue("input", "");
    testCaseForm.setValue("output", "");
  };

  const handleNextClick = () => {
    if (testCases.length === 0) {
      return;
    }
    setOpen(true);
    console.log(testCases);
  };

  const handleProceed = () => {
    setStage(2);
    setOpen(false);
  };

  // Remove a test case by index
  const removeTestcase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  // File upload handler to load and validate a JSON file
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = e.target?.result;
        if (typeof fileContent !== "string") {
          setFileError("File content is not a string.");
          return;
        }
        const parsed = JSON.parse(fileContent);
        // Determine if parsed data is an object or an array
        let testCasesArray: TestCase[] = [];
        if (Array.isArray(parsed)) {
          testCasesArray = parsed;
        } else if (typeof parsed === "object" && parsed !== null) {
          testCasesArray = [parsed];
        } else {
          setFileError("Invalid JSON format. Expected an object or an array.");
          return;
        }

        // Validate each test case using testCaseSchema
        const validatedTestCases: TestCase[] = [];
        for (const testCase of testCasesArray) {
          const validationResult = testCaseSchema.safeParse(testCase);
          if (!validationResult.success) {
            setFileError(
              "Validation error in test case: " +
                JSON.stringify(validationResult.error.format())
            );
            return;
          } else {
            validatedTestCases.push(validationResult.data);
          }
        }
        // Append validated test cases to the current list
        setTestCases([...testCases, ...validatedTestCases]);
      } catch (error: any) {
        setFileError("Error reading file: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  // Handler to remove the file selection
  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedFile(null);
    setFileError(null);
  };

  // Handler to clear all test cases
  const handleClearTestCases = () => {
    setTestCases([]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-5xl text-primary dark:text-primary my-6">
        Add TestCases
      </h1>
      <div className="hidden sm:block sm:w-[650px] lg:w-[850px] bg-white border-2 mb-5 border-black/15 dark:bg-background dark:border-white/15 rounded-lg shadow-xl p-8">
        <Form {...testCaseForm}>
          {/* Form for adding Test Case */}
          <form
            onSubmit={testCaseForm.handleSubmit(addTestCase)}
            className="space-y-6"
          >
            <FormField
              control={testCaseForm.control}
              name="input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Case Input</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Test Case Input"
                      {...field}
                      className="resize-none"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={testCaseForm.control}
              name="output"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Case Output</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Test Case Output"
                      {...field}
                      className="resize-none"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Add Test Case</Button>
            </div>
          </form>
        </Form>
        {/* Or Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* File Upload Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Upload Test Cases JSON File
          </h2>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            {selectedFile && (
              <Button onClick={handleRemoveFile} variant="destructive">
                Remove File
              </Button>
            )}
          </div>
          {fileError && (
            <p className="text-red-500 mt-2">{fileError}</p>
          )}
        </div>

        {/* Current Test Cases Table */}
        <h2 className="text-xl font-semibold mt-8 mb-4">
          Current Test Cases
        </h2>
        {testCases.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No test cases added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>All test cases added so far</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Input</TableHead>
                  <TableHead>Output</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testCases.map((testcase, index) => (
                  <TableRow key={index}>
                    <TableCell className="align-top">
                      {index + 1}
                    </TableCell>
                    <TableCell className="whitespace-pre-wrap">
                      {testcase.input}
                    </TableCell>
                    <TableCell className="whitespace-pre-wrap">
                      {testcase.output}
                    </TableCell>
                    <TableCell className="align-top">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeTestcase(index)}
                      >
                        <Cross1Icon className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Clear All Button rendered only if testCases exist */}
            <div className="flex justify-end mt-4">
              <Button onClick={handleClearTestCases} variant="destructive">
                Clear All Test Cases
              </Button>
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-center mt-6">
          <Button onClick={handleNextClick} disabled={testCases.length === 0}>
            Next Step
          </Button>
        </div>
      </div>
      {/* AlertDialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Proceed to the Next Step?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You won't be able to modify these test cases after proceeding.
              Please review them carefully.
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

export default TestCaseForm;
