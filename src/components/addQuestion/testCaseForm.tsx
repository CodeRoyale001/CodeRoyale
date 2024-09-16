import React, { useState } from "react";
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

const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
});

const TestCaseForm = ({ setStage }: { setStage: (stage: number) => void }) => {
  const [testCases, setTestCases] = useState<any[]>([]);
  const [open, setOpen] = useState(false); // Controls the AlertDialog

  const testCaseForm = useForm<z.infer<typeof testCaseSchema>>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: {
      input: "",
      output: "",
    },
  });

  const onSubmit = (data: any) => {
    setTestCases((prev) => [...prev, data]);
    testCaseForm.reset(); // Reset the form after adding a test case
  };

  const removeTestcase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextClick = () => {
    if (testCases.length === 0) {
      return;
    }
    setOpen(true);
  };

  const handleProceed = () => {
    setStage(2);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-5xl text-primary dark:text-primary my-6">
        Add TestCases
      </h1>{" "}
      <div className="hidden sm:block sm:w-[650px] lg:w-[850px] bg-white border-2 mb-5 border-black/15 dark:bg-background dark:border-white/15 rounded-lg shadow-xl p-8">
        <Form {...testCaseForm}>
          <form
            onSubmit={testCaseForm.handleSubmit(onSubmit)}
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

        <h2 className="text-xl font-semibold mt-8 mb-4">Current Test Cases</h2>
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
                    <TableCell className="align-top">{index + 1}</TableCell>
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
            <AlertDialogTitle>Proceed to the Next Step?</AlertDialogTitle>
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
