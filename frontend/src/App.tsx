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
import { isMessage } from "./store";

export const socket = io(`https://real-estate-chat-app.onrender.com`);

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
        if (isMessage(message)) {
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
    socket.on(Events.AVAILABLECOMMERCIAL, updateMessages);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2014/08/03/23/41/house-409451_640.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Chat />
    </div>
  );
}

export default App;
