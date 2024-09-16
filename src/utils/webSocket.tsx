export const SendMessage = (
  socket: WebSocket,
  message: MatchDetails,
  actionType: string,
) => {
  const retrySend = (
    socket: WebSocket,
    message: MatchDetails,
    actionType: string,
    retries: number = 5,
  ) => {
    if (retries <= 0) {
      console.error(
        "Failed to send message: WebSocket connection is not open after retries.",
      );
      return;
    }

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: actionType, content: message }));
    } else {
      console.warn("WebSocket connection not open. Retrying...");
      setTimeout(
        () => retrySend(socket, message, actionType, retries - 1),
        500,
      ); // retry after 1 second
    }
  };

  retrySend(socket, message, actionType);
};
