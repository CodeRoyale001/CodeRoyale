import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { ChevronDown, Edit3 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,

 } from "../ui/dropdown-menu";
import problemTags from "@/constants/tags";
import { Cross1Icon } from "@radix-ui/react-icons";

const mdParser = new MarkdownIt();
const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  difficulty: z.string({ message: "Difficulty must be selected" }),
  content: z.string().min(10, {
    message: "The content for the question must be at least 10 characters.",
  }),
});

export default function AddQuestionForm({setStage}:{setStage:any}) {
  const [tags, setTags] = useState<Set<string>>(new Set());
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      difficulty: "",
      content: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    setStage(1);
    console.log(data);
    toast({
      title: "Question successfully added to server",
    });
    router.refresh();
  };
  const addTag = (tag: string) => {
    setTags(prevTags => new Set(prevTags).add(tag));
  };
  const removeTag = (tag: string) => {
    setTags(prevTags => {
      const newTags = new Set(prevTags);
      newTags.delete(tag);
      return newTags;
    });
  };
  return (
    <div className="flex flex-col">
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
                  <Select>
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
                    <Controller
                      control={form.control}
                      name="content"
                      render={({ field: { onChange, value } }) => (
                        <MdEditor
                          className="bg-black dark:bg-black"
                          theme="DARK"
                          value={value}
                          style={{
                            height: "500px",
                            borderRadius: "8px",
                            borderColor: "#93c5fd",
                          }}
                          renderHTML={(text) => mdParser.render(text)}
                          onChange={({ text }) => onChange(text)}
                          config={{
                            view: {
                              menu: true,
                              md: true,
                              html: true,
                            },
                            canView: {
                              menu: true,
                              md: true,
                              html: true,
                              fullScreen: false,
                              hideMenu: false,
                            },
                          }}
                        />
                      )}
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
                <Badge variant="destructive" onClick={()=>removeTag(tag)}><Cross1Icon /></Badge>
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
          {/* Dynamically render items from the topics array */}
          {problemTags.map((topic) => (
            <DropdownMenuItem key={topic}>
              <span onClick={()=>addTag(topic)}>{topic}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button">Next Step</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Your Question?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your question will be submitted to the server for review.
                    Please allow some time for the admin to approve your
                    submission.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
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