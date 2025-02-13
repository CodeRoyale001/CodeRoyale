"use client";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-btn";
import { getRequestWithoutAccessToken } from "@/utils/api";
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    "Addendum: The game is in beta mode and may have bugs. Please report any issues to the admin.",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 space-y-6">
      <div className="text-center space-y-2">
        <Sword className="w-12 h-12 mx-auto text-primary" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          1v1 Coding Duel
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Test your skills in a real-time coding battle
        </p>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Match Preparation
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Competition Rules</h3>
            <ScrollArea className="h-[40vh] rounded-lg border p-4 bg-muted/50">
              <ul className="space-y-3 text-sm">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="flex-1">{rule}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="terms"
              checked={agreedToRules}
              onCheckedChange={(checked) => 
                handleCheckboxChange(checked === "indeterminate" ? false : checked)
              }
            />
            <label htmlFor="terms" className="text-sm leading-none">
              I acknowledge and agree to all competition rules
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <LoadingButton
              loading={loading}
              onClick={searchMatch}
              disabled={!agreedToRules}
              className="w-full"
            >
              {loading ? "Searching..." : "Find Opponent"}
            </LoadingButton>
            
            <Button
              variant="secondary"
              onClick={() => router.push("/contests")}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Lobby
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchMatch;