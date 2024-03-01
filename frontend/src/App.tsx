import { useEffect } from "react";

import io from "socket.io-client";
import Chat from "./components/Chat";
import {
  IsFirstTime,
  Message,
  UseChat,
  useChats,
  useIsFirstTime,
} from "./store";
import { Events } from "./components/events";

export const socket = io(`http://localhost:5000`);

function App() {
  const { messages, setMessages } = useChats((state: UseChat) => state);
  const { setIsFirstTime } = useIsFirstTime((state: IsFirstTime) => state);

  const updateMessages = (data: Message) => {
    const newData = [data];

    setMessages(newData);
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("initConvo", (data) => {
      const messagesWithId = messages.filter((message) => {
        if (typeof message === "object") {
          message.id == data.id;
        }
      });

      if (messagesWithId.length > 0) {
        return;
      } else {
        setMessages([data]);
        setIsFirstTime(false);
      }
    });

    socket.on(Events.BUYHOME, updateMessages);
    socket.on(Events.BUYCOMMERCIAL, updateMessages);
    socket.on(Events.GETCOMMERCIALPRICE, updateMessages);
    socket.on(Events.COMMERCIALPRICERANGE, (data) => {
      setMessages([data]);
    });
  }, []);
  socket.on(Events.AVAILABLECOMMERCIAL, updateMessages);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Chat />
    </div>
  );
}

export default App;
