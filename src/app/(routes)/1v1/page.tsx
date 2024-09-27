// pages/1v1/search.tsx
"use client";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-btn";
import { getRequestWithoutAccessToken } from "@/utils/api";
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Response {
  status: number;
  message: string;
  data?: MatchDetails;
}

const SearchMatch: React.FC = () => {
  const router = useRouter();
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Define the game rules
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
      setLoading(true); // Start loading
      const playerID = getCookie("userName");
      const url = `${process.env.MM_URI}/search?playerID=${playerID}`;
      await getRequestWithoutAccessToken(url, (response: Response) => {
        const matchDetails = response?.data;
        const matchID = matchDetails?.match_id || "";
        setCookie("match_id", matchID, 1);
        const MatchDetailsString = JSON.stringify(matchDetails);

        setCookie("matchDetails", MatchDetailsString, 1);

        router.push(`/1v1/${matchID}`); // Redirect to the match page
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      {/* 1v1 Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
        1v1 Contest
      </h1>

      {/* Container */}
      <div className="w-full max-w-2xl p-6 md:p-8 lg:p-10 bg-card rounded-lg shadow-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            Search for a Match
          </h1>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
            Please agree to the rules before proceeding.
          </p>
        </div>

        {/* Rules Container */}
        <div className="mb-6 max-h-[50vh] overflow-y-auto border border-border rounded-lg p-4 bg-popover">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-foreground">
            Game Rules
          </h2>
          <ul className="list-decimal list-inside text-foreground text-base md:text-lg lg:text-xl space-y-2">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center mb-6">
          <Checkbox
            id="agreeCheckbox"
            checked={agreedToRules}
            onCheckedChange={handleCheckboxChange}
            className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
          <label
            htmlFor="agreeCheckbox"
            className="ml-3 text-base md:text-lg lg:text-xl text-foreground"
          >
            I agree to abide by the rules and understand the penalties for violations.
          </label>
        </div>

        {/* Search Match Button */}
        <LoadingButton
          loading={loading}
          onClick={searchMatch}
          className="w-full py-4 md:py-5 lg:py-6 text-xl md:text-2xl lg:text-3xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 disabled:bg-primary/50"
          type="button"
          disabled={!agreedToRules || loading}
        >
          Search Match
        </LoadingButton>
      </div>
    </div>
  );
};

export default SearchMatch;
