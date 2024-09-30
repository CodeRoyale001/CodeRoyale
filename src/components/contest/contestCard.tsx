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
import { ArrowRight } from "lucide-react";

interface ContestCardProps {
  title: string;
  description: string;
  content: string;
  buttonText: string;
  buttonAction: string;
  icon: React.ReactNode;
}

const ContestCard: React.FC<ContestCardProps> = ({
  title,
  description,
  content,
  buttonText,
  buttonAction,
  icon,
}) => {
  const router = useRouter();

  return (
    <Card className="w-full flex flex-col transform transition duration-300 hover:scale-105 bg-card shadow-lg">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl md:text-3xl flex items-center text-primary">
          {icon && <span className="mr-3">{icon}</span>}
          {title}
        </CardTitle>
        <CardDescription className="text-base md:text-lg">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-light text-sm md:text-base lg:text-lg text-muted-foreground">
          {content}
        </p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          onClick={() => router.push(buttonAction)}
          className="w-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg"
        >
          {buttonText}{" "}
          <span className="ml-2">
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
