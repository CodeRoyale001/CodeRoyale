import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ChevronDown, Edit3 } from "lucide-react";
import MarkdownEditor from "../editor/mdEditor";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import problemTags from "@/constants/tags";
import { Cross1Icon } from "@radix-ui/react-icons";

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
});

export default function AddQuestionForm({ setStage }: { setStage: (stage: number) => void }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false); // State to control AlertDialog

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      difficulty: "",
      content: "",
    },
  });

  const onValid = (data: z.infer<typeof formSchema>) => {
    setOpen(true); 
  };

  const onSubmit = () => {
    const data = form.getValues(); 
    setStage(1); 
    console.log(data);
    setOpen(false);
  };

  const addTag = (tag: string) => {
    setTags((prevTags) => new Set(prevTags).add(tag));
  };
  const removeTag = (tag: string) => {
    setTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.delete(tag);
      return newTags;
    });
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-bold text-5xl text-primary dark:text-primary my-6">
        Add Question
      </h1>
      <div className="hidden sm:block sm:w-[650px] lg:w-[850px] bg-white border-2 mb-5 border-black/15 dark:bg-background dark:border-white/15 rounded-lg shadow-xl p-8">
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Edit3 className="text-primary" /> Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Two Sum"
                      {...field}
                      className="rounded-lg transition duration-200"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Enter the title for your question
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <ChevronDown className="text-primary" /> Difficulty
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
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Select the difficulty level for your question
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Edit3 className="text-primary" /> Question Content
                  </FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      content={field.value}
                      setContent={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Enter the content for your question using Markdown.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {Array.from(tags).map((tag, index) => (
              <Badge variant="outline" key={index} className="text-sm">
                <span>{tag}</span>
                <Badge variant="destructive" onClick={() => removeTag(tag)}>
                  <Cross1Icon />
                </Badge>
              </Badge>
            ))}
            <div className="flex justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button">Add Tags</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Available Tags</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {problemTags.map((topic) => (
                      <DropdownMenuItem key={topic}>
                        <span onClick={() => addTag(topic)}>{topic}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Modified Next Step Button */}
              <Button type="button" onClick={form.handleSubmit(onValid)}>
                Next Step
              </Button>
              {/* Controlled AlertDialog */}
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Submit Your Question?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will not be able to return to this step. Please
                      review your question carefully before proceeding.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onSubmit}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </div>
      <div className="block sm:hidden text-primary-foreground font-bold text-xl">
        Sorry, you can't add questions in mobile view.
      </div>
    </div>
  );
}
