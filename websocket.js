const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
  onOpen: () => {
    console.log('WebSocket connection opened');
  },
  onClose: () => {
    console.log('WebSocket connection closed');
  },
  onMessage: (event) => {
    console.log('Received message:', event.data);
    setMessageHistory((prev) => [...prev, event.data]);
  },
  onError: (event) => {
    console.error('WebSocket error:', event);
    console.error('Error details:', event.message, event.reason, event.code);
  },
  retryOnError: false,
  reconnectAttempts: 5,
  shouldReconnect: () => true,
});

useEffect(() => {
  // Cleanup function to close the WebSocket connection
  return () => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(''); // Send a dummy message to indicate cleanup, if needed
    }
  };
}, [readyState, sendMessage]);
