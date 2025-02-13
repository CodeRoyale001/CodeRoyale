import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface ContestCardProps {
  className?: string;
  title: string;
  description: string;
  content: string;
  buttonText: string;
  buttonAction: string;
  icon: React.ReactNode;
}

export default function Modescard({
  className,
  title,
  description,
  content,
  buttonText,
  buttonAction,
  icon,
}: ContestCardProps) {
  const router = useRouter();

  return (
    <div
      className={cn("flex flex-col h-full p-6 rounded-xl shadow-lg", className)}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-800 mb-4">{description}</p>

      <div className="flex-grow mb-6">
        <p className="text-gray-700 text-sm">{content}</p>
      </div>

      <Button
        className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-lg border border-white/20 hover:border-white/30 transition-all hover:shadow-lg"
        variant="outline"
        onClick={() => router.push(buttonAction)}
      >
        {buttonText}
      </Button>
    </div>
  );
}
