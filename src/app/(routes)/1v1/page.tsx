'use client'
import { getRequestWithoutAccessToken } from '@/utils/api';
import { getCookie } from '@/utils/cookies';
import { SendMessage } from '@/utils/webSocket';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Response {
  status: number;
  message: string;
  data?: MatchDetails;
}

function sendMatchDetails(ws: WebSocket, matchDetails: MatchDetails): void {
  const matchDetailsJson = JSON.stringify(matchDetails);
  ws.send(matchDetailsJson);
}

const OneVOne: React.FC = () => {
  const router = useRouter();
  const [matchDetails, setMatchDetails] = useState<MatchDetails>({} as MatchDetails);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [message, setMessage] = useState<string>('');

  // Log updated matchDetails
  useEffect(() => {
    // console.log("Match Details Updated:", matchDetails);
    // If matchDetails is updated and contains a match_id, establish WebSocket connection
    if (matchDetails.match_id) {
      // Close existing WebSocket connection if any
      if (socket) {
        socket.close();
      }
      const ws = new WebSocket(`ws://localhost:8080/ws/${matchDetails.match_id}?username=${getCookie('userName')}`);
      
      ws.onopen = () => {
        setSocket(ws);
        console.log('WebSocket connection opened');
        // let tempResult= JSON.stringify(matchDetails);
        SendMessage(ws, matchDetails,"init");
        // sendMatchDetails(ws, matchDetails);
        if(matchDetails.is_available==false){
          SendMessage(ws,matchDetails,"ready");
        }
      };

      ws.onmessage = (event) => {
        try {
          console.log('Message from server:', event.data);
          const result= JSON.parse(event.data);
          // console.log(result);
          
          if(result.action=="start"){
            console.log("Match Ending in 50 sec");
            SendMessage(ws,matchDetails,"join");
            console.log("Match Started");
            // router.push(`/1v1/${matchDetails.match_id}`);
          }

        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('Disconnected from server');
      };
    }
  }, [matchDetails]); // This effect runs when matchDetails changes
  const searchMatch = async () => {
    try {
      const playerID = getCookie('userName');
      const url = `http://localhost:8080/search?playerID=${playerID}`;
          await getRequestWithoutAccessToken(url, (response: Response) => {
            setMatchDetails(response.data as MatchDetails);
          });
    } catch (error : any) {
      //DO Something
      alert(error.message);
    }
  };
  

  useEffect(() => {
    return () => {
      // Cleanup the WebSocket connection when the component is unmounted
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <div className="border border-black p-4 flex flex-col items-center">
      <button
        onClick={searchMatch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Search Match
      </button>
      {matchDetails.match_id && <p>Connected to Match: {matchDetails.match_id}</p>}
    </div>
  );
};

export default OneVOne;
