import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyleCircle,
} from "@/components/ui/navigation-menu";
import { CodeEditor, Problem } from "@/components/problem";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
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
interface ProblemProps {
  problem1: ProblemDTO;
  problem2: ProblemDTO;
  problem3: ProblemDTO;
  problem4: ProblemDTO;
  timer: number;
  endmatch: () => void;
}

const TimedLayout: React.FC<ProblemProps> = ({
  problem1,
  problem2,
  problem3,
  problem4,
  timer,
  endmatch,
}) => {
  const [selectedTab, setSelectedTab] = useState("1");

  const renderProblem = () => {
    switch (selectedTab) {
      case "1":
        return <Problem problemInfo={problem1} />;
      case "2":
        return <Problem problemInfo={problem2} />;
      case "3":
        return <Problem problemInfo={problem3} />;
      case "4":
        return <Problem problemInfo={problem4} />;
      default:
        return <Problem problemInfo={problem1} />;
    }
  };

  const renderEditor = () => {
    switch (selectedTab) {
      case "1":
        return (
          <CodeEditor
            problemId={problem1.problemId}
            editorheight={"h-[calc(100vh-175px)]"}
          />
        );
      case "2":
        return (
          <CodeEditor
            problemId={problem2.problemId}
            editorheight={"h-[calc(100vh-175px)]"}
          />
        );
      case "3":
        return (
          <CodeEditor
            problemId={problem3.problemId}
            editorheight={"h-[calc(100vh-175px)]"}
          />
        );
      case "4":
        return (
          <CodeEditor
            problemId={problem4.problemId}
            editorheight={"h-[calc(100vh-175px)]"}
          />
        );
      default:
        return (
          <CodeEditor
            problemId={problem1.problemId}
            editorheight={"h-[calc(100vh-175px)]"}
          />
        );
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Top Bar */}
      <div className="flex items-center h-16 p-4 bg-background text-foreground">
        {/* Hamburger Icon */}
        <HamburgerMenuIcon className="w-8 h-8" />
        <div className="flex items-center pl-8 h-16 justify-between w-full">
          {/* Contest Title */}
          <span className="font-semibold">1v1 Contest</span>

          {/* Timer with Rounded Border */}
          <span className="px-4 py-2 bg-gray-200 text-black  rounded-full">
            Match ends in: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </span>

          {/* End Match Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"outline"} className="px-4 py-2 rounded-full">
                End Match
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to End the Match. Ensure all your work is saved
                  before proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={endmatch}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex flex-grow items-start">
        {/* Left Navbar */}
        <div className="navbar-container w-16 flex flex-col pt-4 items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col justify-start space-y-4">
              {[1, 2, 3, 4].map((tab) => (
                <NavigationMenuItem key={tab}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyleCircle()} cursor-pointer text-xl gap-4`}
                    onClick={() => setSelectedTab(tab.toString())}
                  >
                    {tab}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Main Content Area and Code Editor Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-grow">
          <ResizablePanel className="flex flex-col">
            <div className="flex-grow p-4 overflow-auto">{renderProblem()}</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="flex flex-col">
            {renderEditor()}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default TimedLayout;
