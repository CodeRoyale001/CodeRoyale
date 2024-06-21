import React, { useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { CircleUser } from "lucide-react";

interface ProblemProps {
	problemTitle: string;
}

const Layout: React.FC<ProblemProps> = ({ problemTitle }) => {
	const [selectedTab, setSelectedTab] = useState("ProblemStatement");

	const renderContent = () => {
		switch (selectedTab) {
			case "ProblemStatement":
				return <Problem problemTitle={problemTitle} />;
			case "Submissions":
				return <Submissions />;
			case "Editorial":
				return <Editorial />;
            case "Discussion":
                return <Discussion />;
			default:
				return <Problem problemTitle={problemTitle} />;
		}
	};

	return (
		<div className="flex h-screen">
			{/* Left Navbar */}
			<div className="navbar-container w-14 flex flex-col  bg-background text-foreground">
				<Link href="/" legacyBehavior passHref>
					<div className="p-2 pt-7 cursor-pointer">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</Link>
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
								onClick={() =>
									setSelectedTab("Discussion")
								}
							>
								Discussion
							</NavigationMenuLink>
						</NavigationMenuItem>

					</NavigationMenuList>
				</NavigationMenu>
			</div>

			{/* Main Content Area and Code Editor Area */}
			<ResizablePanelGroup direction="horizontal" className="flex-grow">
				<ResizablePanel className="flex flex-col">
					<div className="flex-grow p-4 overflow-auto">
						{renderContent()}
					</div>
				</ResizablePanel>
				<ResizableHandle className="bg-gray-400" withHandle />
				<ResizablePanel className="flex flex-col">
					<CodeEditor  />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default Layout;
