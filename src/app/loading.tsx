import DarkLightButton from "@/components/buttons";
import CodeRoyaleLogo from "@/components/navbar/logo";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import React from "react";

const Loading: any = () => {
	return (
		<div className="bg-background text-card-foreground h-20 w-full top-0 z-50">
			<div className="flex items-center justify-between px-4 md:px-8 py-4  gap-2 max-w-7xl mx-auto h-full">
				<Link href="/" passHref className="cursor-pointer">
					<CodeRoyaleLogo />
				</Link>
					<Skeleton className="h-10 w-full" />
				<div className="hidden md:flex items-center space-x-4 cursor-pointer">
					<DarkLightButton />
				</div>
			</div>
		</div>
	);
};

export default Loading;
