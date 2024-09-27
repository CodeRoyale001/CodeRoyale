import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ContestCardProps {
  title: string;
  description: string;
  content: string;
  buttonText: string;
  buttonAction: string;
}

const ContestCard: React.FC<ContestCardProps> = ({
  title,
  description,
  content,
  buttonText,
  buttonAction,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-stretch">
      <Card className="min-w-[360px] max-w-[500px] w-full flex flex-col transform transition duration-300 hover:scale-105 bg-card shadow-lg">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl md:text-3xl flex items-center text-primary">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="font-light text-md lg:text-lg">
          {content}
        </CardContent>
        <CardFooter className="flex justify-center mt-auto">
          <Button
            onClick={() => router.push(buttonAction)}
            className="w-full px-6 py-3 sm:px-10 sm:py-5 md:py-6 text-sm sm:text-lg md:text-xl"
          >
            {buttonText} --{">"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContestCard;
