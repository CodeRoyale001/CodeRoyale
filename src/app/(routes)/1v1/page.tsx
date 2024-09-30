"use client";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-btn";
import { getRequestWithoutAccessToken } from "@/utils/api";
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Sword, ArrowLeft } from "lucide-react";

interface Response {
  status: number;
  message: string;
  data?: MatchDetails;
}

const SearchMatch: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [loading, setLoading] = useState(false);

  const rules = [
    "Copy-pasting is not allowed. All answers must be your original work.",
    "You must take the test in full-screen mode only.",
    "Switching tabs during the test is prohibited and will be detected.",
    "Ensure you have a stable internet connection throughout the test.",
    "The test is timed and consists of two questions.",
    "In 1v1 mode, the first user to solve both questions correctly wins the match.",
    "Cheating in any form is strictly prohibited.",
    "Be respectful to other players at all times.",
    "Use appropriate and professional language.",
    "Do not disconnect intentionally during the match.",
    "Play fair and enjoy the game.",
    "Follow all game guidelines and instructions.",
  ];

  const handleCheckboxChange = (checked: boolean) => {
    setAgreedToRules(checked);
  };

  const searchMatch = async () => {
    try {
      setLoading(true);
      const playerID = getCookie("userName");
      const url = `${process.env.MM_URI}/search?playerID=${playerID}`;
      await getRequestWithoutAccessToken(url, (response: Response) => {
        const matchDetails = response?.data;
        const matchID = matchDetails?.match_id || "";
        setCookie("match_id", matchID, 1);
        const MatchDetailsString = JSON.stringify(matchDetails);
        setCookie("matchDetails", MatchDetailsString, 1);
        router.push(`/1v1/${matchID}`);
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center gap-2 mb-10">
      <Sword className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
      1v1 Contest
      </h2>

      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
            <h2>Search for a Match</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">Please agree to the rules before proceeding.</p>
          </div>

          <ScrollArea className="h-[40vh] rounded-md border p-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">Game Rules</h3>
            <ul className="list-disc list-inside space-y-2">
              {rules.map((rule, index) => (
                <li key={index} className="text-sm sm:text-base">{rule}</li>
              ))}
            </ul>
          </ScrollArea>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeCheckbox"
              checked={agreedToRules}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="agreeCheckbox"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to abide by the rules and understand the penalties for violations.
            </label>
          </div>

          <div className="space-y-2">
            <LoadingButton
              loading={loading}
              onClick={searchMatch}
              className="w-full"
              type="button"
              disabled={!agreedToRules || loading}
            >
              Search Match
            </LoadingButton>
            <Button
              onClick={() => router.push("/contests")}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchMatch;
