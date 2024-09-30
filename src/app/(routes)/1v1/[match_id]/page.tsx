"use client";
import { getCookie, deleteCookie } from "@/utils/cookies";
import { SendMessage } from "@/utils/webSocket";
import { useRouter } from "next/navigation";
import { getRequest } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import TimedLayout from "@/components/problem/timedLayout";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const MatchPage: React.FC = () => {
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [timer, setTimer] = useState<number>(15);
  const [playerJoined, setPlayerJoined] = useState<number>(0);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [problem, setProblem] = React.useState<any>({} as ProblemDTO);
  const [isMatchStarted, setIsMatchStarted] = useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [isGameNotFound, setIsGameNotFound] = React.useState<boolean>(false); // State to handle game not found
  const { toast } = useToast();

  let matchDetails: MatchDetails | null = null;
  let match_id: string | null = null;
  let userName: string | null = null;

  try {
    const matchDetailsString = getCookie("matchDetails");
    matchDetails = matchDetailsString
      ? JSON.parse(matchDetailsString)
      : null;

    match_id = getCookie("match_id");
    userName = getCookie("userName");
  } catch (error) {
    console.error("Error retrieving match details from cookie:", error);
    toast({
      title: "Error",
      description: "Error retrieving details from cookie.",
    });
  }

  const fetchProblemDetails = async () => {
    try {
      const url = `${process.env.JS_URI}/api/getProblem?title=${questionTitle}`;
      const accessToken = getCookie("accessToken");
      getRequest(url, accessToken, (response) => {
        const newProblem = {
          ...response[0],
          problemId: response[0]._id,
        };
        setProblem(newProblem);
      });
    } catch (error) {
      console.error("Error fetching problem details:", error);
      setError(true);
      toast({
        title: "Error",
        description:
          "Error fetching problem details. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (match_id && matchDetails) {
      const currentMatchDetails = matchDetails; // Capture matchDetails here
      if (socket) {
        socket.close();
      }
      const ws = new WebSocket(
        `${process.env.WSMM_URI}/ws/${match_id}?username=${userName}`
      );

      ws.onopen = () => {
        setSocket(ws);
        console.log("WebSocket connection opened");
        SendMessage(ws, currentMatchDetails, "init");
        console.log("Init Message Sent", currentMatchDetails);

        if (!currentMatchDetails.is_available) {
          SendMessage(ws, currentMatchDetails, "ready");
          console.log("Ready Message Sent", currentMatchDetails);
        }
      };

      ws.onmessage = (event: MessageEvent) => {
        const messages = event.data.split("\n");

        messages.forEach((message: string) => {
          if (message.trim() !== "") {
            try {
              const result: any = JSON.parse(message);
              console.log("Message from server:", result);
              setPlayerJoined(result.player_joined);

              if (result.action === "start") {
                console.log("Match Started");
                setQuestionTitle(result.questionTitle);

                SendMessage(ws, currentMatchDetails, "join");
                console.log("Player Joined");

                setIsMatchStarted(true);

                const ttl = result.matchtime || 15;
                setTimer(ttl);
              } else if (
                result.action === "end" &&
                result.message === "Game Not Found"
              ) {
                setIsGameNotFound(true);
              }
            } catch (error) {
              console.error("Error parsing message:", error);
            }
          }
        });
      };

      ws.onclose = () => {
        console.log("Disconnected from server");
        deleteCookie("match_id");
        deleteCookie("matchDetails");
        router.push("/1v1");
      };

      return () => {
        if (socket) {
          socket.close();
        }
      };
    }
  }, [match_id]);

  const leaveMatch = () => {
    if (socket && match_id) {
      if (matchDetails) {
        SendMessage(socket, matchDetails, "leave");
      }
      console.log("Leaving the Match");
      socket.close();
    }
  };

  useEffect(() => {
    if (questionTitle) {
      fetchProblemDetails();
    }
  }, [questionTitle]);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0 && isMatchStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isMatchStarted]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {isMatchStarted && timer > 0 ? (
        <TimedLayout
          problem1={problem}
          problem2={problem}
          problem3={problem}
          problem4={problem}
          timer={timer}
          endmatch={leaveMatch}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 md:p-8 lg:p-10 bg-card rounded-lg shadow-md text-center">
            {!isMatchStarted ? (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Waiting for Match to Start
                </h1>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-6">
                  Please wait while we connect you with another player.
                </p>
                <div className="flex justify-center mb-6">
                  {/* Add a loading spinner */}
                  <Spinner className="w-12 h-12 text-primary animate-spin" />
                </div>
                <p className="text-foreground text-base md:text-lg lg:text-xl">
                  Players Joined:{" "}
                  <span className="font-semibold">{playerJoined}/2</span>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Match Has Ended
                </h1>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-6">
                  Thank you for participating.
                </p>
                <Button
                  onClick={() => router.push("/1v1")}
                  className="mt-6 px-4 py-2 text-sm md:text-base lg:text-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90"
                >
                  Back to Home
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Game Not Found AlertDialog */}
      {isGameNotFound && (
        <AlertDialog
          open={isGameNotFound}
          onOpenChange={setIsGameNotFound}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">Game Not Found</AlertDialogTitle>
              <AlertDialogDescription>
                No users are available to join, so the game could not be started. Redirecting to the home page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={leaveMatch} variant="destructive">
                Okay
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default MatchPage;
