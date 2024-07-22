'use client'
import { getRequestWithoutAccessToken } from '@/utils/api';
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
  const [matchDetails, setMatchDetails] = useState<MatchDetails>({} as MatchDetails);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [playerID, setPlayerID] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const searchMatch = async () => {
    try {
      const url = `http://localhost:8080/search?playerID=${playerID}`;
      const dataPromise: Promise<MatchDetails> = new Promise(
        (resolve, reject) => {
          getRequestWithoutAccessToken(url, (response:Response) => {
            if (response.status === 200 && response.data) {
              resolve(response.data);
            } else {
              reject(new Error("Failed to fetch match details"));
            }
          });
        }
      );
      const matchData = await dataPromise;
      setMatchDetails(matchData);
    //   console.log("Match Details Are:",matchDetails);

      // Close existing WebSocket connection if any
      if (socket) {
        socket.close();
      }

      // Connect to WebSocket with the matchId
      const ws = new WebSocket(`ws://localhost:8080/ws/${matchDetails.match_id}`);
      setSocket(ws);

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        // Send an initial message if needed
        sendMatchDetails(ws, matchDetails);
      };

      ws.onmessage = (event) => {
        try {
            // Parse the JSON data from the event
            // const data = JSON.parse(event.data);
            console.log('Message from server:', event.data);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

      ws.onclose = (event) => {
        console.log('Disconnected from server');
      };
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: 'message', content: message }));
      setMessage(''); // Clear the message input after sending
    } else {
      console.error('WebSocket connection is not open.');
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
    <div className="border border-black p-4">
      <input
        type="text"
        value={playerID}
        onChange={(e) => setPlayerID(e.target.value)}
        placeholder="Enter Player ID"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={searchMatch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Search Match
      </button>
      {matchDetails.match_id && <p>{matchDetails.player_a_id[0]}Connected to Match: {matchDetails.match_id}</p>}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={sendMessage}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Message
      </button>
    </div>
  );
};

export default OneVOne;
