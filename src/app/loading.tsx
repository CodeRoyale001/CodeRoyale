import DarkLightButton from "@/components/buttons";
import CodeRoyaleLogo from "@/components/navbar/logo";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import React from "react";

const Loading: any = () => {
  return (
    <div className="h-1/6 navbar-container flex flex-row gap-10 justify-between  p-5 pl-10 pr-44 bg-background text-foreground border-b">
      <Link href="/" legacyBehavior passHref>
        <div className="flex flex-row gap-10 cursor-pointer">
          <div className="relative w-44 h-10 rounded-lg mr-24">
            <CodeRoyaleLogo />
          </div>
        </div>
      </Link>

      <Skeleton className="h-10 w-full" />
      <div className="absolute right-5 top-5">
        <DarkLightButton />
      </div>
    </div>
  );
};

export default Loading;
