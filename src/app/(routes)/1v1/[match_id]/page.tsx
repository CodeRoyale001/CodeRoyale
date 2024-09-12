'use client'
import { getCookie, deleteCookie } from '@/utils/cookies';
import { SendMessage } from '@/utils/webSocket';
import { useRouter } from 'next/navigation';
import Layout from "@/components/problem/Layout";
import { getRequest } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";


import React, { useState, useEffect } from 'react';
import TimedLayout from '@/components/problem/timedLayout';

const MatchPage: React.FC = () => {
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [timer, setTimer] = useState<number>(15);
  const [playerJoined, setPlayerJoined] = useState<number>(0);

  const [questionTitle, setquestionTitle] = useState<string>("");
  const [problem, setProblem] = React.useState<any>({} as ProblemDTO);
  const [isMatchStarted, setIsMatchStarted] = useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const matchDetailsString = getCookie('matchDetails');
  const matchDetails : MatchDetails = matchDetailsString ? JSON.parse(matchDetailsString) : null;
  const match_id = getCookie('match_id');
  const userName = getCookie('userName'); 
  const { toast } = useToast();

  const fetchProblemDetails = async () => {
		try {
			const url =
				process.env.JS_URI + `/api/getProblem?title=${questionTitle}`;
			const accessToken = getCookie("accessToken");
			getRequest(url, accessToken, (response) => {
				const newProblem = {
					...response,
					problemId: response._id
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
            if (socket) {
              socket.close();
            }
      const ws = new WebSocket(`ws://localhost:8080/ws/${match_id}?username=${userName}`);

      ws.onopen = () => {
        setSocket(ws);
        console.log('WebSocket connection opened');
        SendMessage(ws, matchDetails, "init"); 
        console.log('Init Message Sent', matchDetails);
        
        if (!matchDetails.is_available) {
          SendMessage(ws, matchDetails, "ready");
          console.log('Ready Message Sent', matchDetails);
        }
      };

      ws.onmessage = (event: MessageEvent) => {
        // Split the event data in case there are multiple JSON objects concatenated
        const messages = event.data.split('\n'); // Assuming newline separates messages
      
        messages.forEach((message: string) => {
          if (message.trim() !== '') { // Check if message is not empty
            try {
              const result: any = JSON.parse(message); // Parsing JSON without strict typing
              console.log('Message from server:', result);
              setPlayerJoined(result.player_joined);
      
              if (result.action === "start") {
                console.log("Match Started");
                setquestionTitle(result.questionTitle)
                
                SendMessage(ws, matchDetails, "join");
                console.log("Player Joined");
      
                setIsMatchStarted(true);
      
                // Use the ttl provided by the server to start the timer
                const ttl = result.matchtime || 15; // Default ttl if not provided
                setTimer(ttl); // Set the timer from server
              }
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          }
        });
      };
      
      ws.onclose = () => {
        console.log('Disconnected from server');
        deleteCookie('match_id');
        deleteCookie('matchDetails');
        router.push('/1v1');  
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
      SendMessage(socket, matchDetails, "end"); 
      console.log("Leaving the Match");
      socket.close();
    }
  };

  useEffect(()=> {
    fetchProblemDetails()
  }, [questionTitle])

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div>
      {isMatchStarted && timer > 0 ? (
        <>
          <TimedLayout problem1={problem} problem2={problem} problem3={problem} problem4={problem} timer={timer} endmatch={leaveMatch}/> 
        </>
      ) : (
        <div className="p-4 flex flex-col items-center h-screen pt-20">
        <p>{isMatchStarted ? 'Match has ended.' : 'Waiting for match to start...'}</p>
        {!isMatchStarted && 
        <>
        <p>Players Joined - {playerJoined}</p>
        </>}
        </div>
      )}
    </div>
  );
};

export default MatchPage;
