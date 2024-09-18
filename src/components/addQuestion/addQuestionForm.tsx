import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import MarkdownEditor from "../editor/mdEditor";
import problemTags from "@/constants/tags";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  difficulty: z.string().nonempty({
    message: "Difficulty must be selected",
  }),
  content: z.string().min(10, {
    message: "The content for the question must be at least 10 characters.",
  }),
  tags: z.array(z.string()).nonempty({
    message: "Tags must be selected",
  }),
});

export default function AddQuestionForm({
  setStage,
  setQuestionDetail,
}: {
  setStage: (stage: number) => void;
  setQuestionDetail: (questionDetail: QuestionDetails) => void;
}) {
  const [open, setOpen] = useState(false); // Controls the AlertDialog

  const OPTIONS: Option[] = problemTags.map((tag) => ({
    label: tag,
    value: tag,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      difficulty: "",
      content: "",
      tags: [],
    },
  });

  const onValid = (data: z.infer<typeof formSchema>) => {
    setOpen(true);
  };

  const onSubmit = () => {
    const data = form.getValues();
    setQuestionDetail(data);
    setStage(1); // Proceed to the next stage
    setOpen(false); // Close the AlertDialog
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-5xl text-primary dark:text-primary my-6">
        Add Question
      </h1>
      <div className="hidden sm:block sm:w-[650px] lg:w-[850px] bg-white border-2 mb-5 border-black/15 dark:bg-background dark:border-white/15 rounded-lg shadow-xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onValid)} className="space-y-8">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Two Sum"
                      {...field}
                      className="rounded-lg transition duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficulty Field */}
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    Difficulty
                  </FormLabel>
                  <FormControl>
                  <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full rounded-lg transition duration-200">
                        <SelectValue placeholder="Choose Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-green-500" value="easy">
                          Easy
                        </SelectItem>
                        <SelectItem className="text-yellow-500" value="medium">
                          Medium
                        </SelectItem>
                        <SelectItem className="text-red-500" value="hard">
                          Hard
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags Field */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    Tags
                  </FormLabel>
                  <FormControl>
                    <MultipleSelector
                      defaultOptions={OPTIONS}
                      placeholder="Add question tags..."
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                      onChange={(selectedOptions: Option[]) => {
                        const values = selectedOptions.map(
                          (option) => option.value,
                        );
                        field.onChange(values);
                      }}
                      value={
                        field.value
                          ? field.value.map((tag) => ({
                              label: tag,
                              value: tag,
                            }))
                          : []
                      }
                      disabled={false} // Set to true if you want to disable the component
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    Question Content
                  </FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      content={field.value}
                      setContent={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button type="submit">Next Step</Button>
            </div>
          </form>
        </Form>
      </div>

      {/* AlertDialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Your Question?</AlertDialogTitle>
            <AlertDialogDescription>
              Review your question before submitting. You will not be able to
              return to this step.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
