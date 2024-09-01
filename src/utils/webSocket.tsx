export const SendMessage = (socket : WebSocket, message: MatchDetails, actionType:string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: actionType, content: message }));
    } else {
      console.error('WebSocket connection is not open.');
    }
  };