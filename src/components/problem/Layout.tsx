import React, { useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
	CodeEditor,
	Problem,
	Submissions,
	Editorial,
	Discussion,
} from "@/components/problem";
import { Button } from "../ui/button";
import { Home, SkipBack, SquareArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProblemProps {
	problem: ProblemDTO;
}

const Layout: React.FC<ProblemProps> = ({ problem }) => {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState("ProblemStatement");

	const renderContent = () => {
		switch (selectedTab) {
			case "ProblemStatement":
				return <Problem problemInfo={problem} />;
			case "Submissions":
				return <Submissions problemId={problem.problemId} />;
			case "Editorial":
				return <Editorial />;
			case "Discussion":
				return <Discussion />;
			default:
				return <Problem problemInfo={problem} />;
		}
	};

	return (
		<div className="flex h-screen">
			{/* Left Navbar */}
			<div className="navbar-container w-14 flex flex-col bg-background border-r text-foreground h-screen overflow-hidden items-center">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => router.push("/")}
					className="mt-8"
				>
					<Home />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => router.back()}
					className="mt-3"
				>
					<SquareArrowLeft />
				</Button>
				<NavigationMenu>
					<NavigationMenuList className="flex flex-col items-center">
						<NavigationMenuItem>
							<NavigationMenuLink
								className={`${navigationMenuTriggerStyle()} cursor-pointer text-xl p-4 transform -rotate-90 m-16`}
								onClick={() =>
									setSelectedTab("ProblemStatement")
								}
							>
								Problem
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={`${navigationMenuTriggerStyle()} cursor-pointer text-xl p-4 transform -rotate-90 m-16`}
								onClick={() => setSelectedTab("Submissions")}
							>
								Submissions
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={`${navigationMenuTriggerStyle()}  m-16 cursor-pointer text-xl p-4 transform -rotate-90`}
								onClick={() => setSelectedTab("Editorial")}
							>
								Editorial
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={`${navigationMenuTriggerStyle()} cursor-pointer text-xl p-4 transform -rotate-90 m-16`}
								onClick={() => setSelectedTab("Discussion")}
							>
								Discussion
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			{/* Main Content Area and Code Editor Area */}
			<ResizablePanelGroup direction="horizontal" className="flex-grow sm:hidden">
				<ResizablePanel className="flex flex-col">
					<div className="flex-grow p-4 overflow-auto">
						{renderContent()}
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel className="flex flex-col">
					<CodeEditor
						problemId={problem.problemId}
						editorheight={"h-[calc(100vh-100px)]"}
					/>
				</ResizablePanel>
			</ResizablePanelGroup>


		</div>
	);
};

export default Layout;
