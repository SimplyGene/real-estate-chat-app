import React, { useState, useRef } from "react";
import "../styles/index.css";
import { useIsFirstTime, IsFirstTime, UseChat, useChats } from "../store";
import { socket } from "../App";
import { Events } from "./events";
import { getLocationString, getTypeString, getFeatures } from "../utils";

import house1 from "./house1.jpg";
import house2 from "./house2.jpeg";
import house3 from "./house3.jpeg";
import commercial1 from "./commercial.jpeg";
import commercial2 from "./commercial4.jpeg";
import commercial3 from "./commercial2.jpeg";

import apartment1 from "./apartment.jpeg";
import apartment2 from "./apartment2.jpeg";
import apartment3 from "./apartment3.jpeg";
const Chat: React.FC = () => {
  function getOptionHouseTypeImage(houseType: number): string {
    switch (houseType) {
      case 1:
        return commercial1;
      case 2:
        return house1;
      case 3:
        return apartment1;
      default:
        return "";
    }
  }

  function getOptionHouseTypeImage2(houseType: number): string {
    switch (houseType) {
      case 1:
        return commercial2;
      case 2:
        return house2;
      case 3:
        return apartment2;
      default:
        return "";
    }
  }
  function getOptionHouseTypeImage3(houseType: number): string {
    switch (houseType) {
      case 1:
        return commercial3;
      case 2:
        return house3;
      case 3:
        return apartment3;
      default:
        return "";
    }
  }
  const { messages, clearMessages } = useChats((state: UseChat) => state);
  const [price, setPrice] = useState<null | number | string>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [houseType, setHouseType] = useState<number | null>(null);
  const [actionType, setActionType] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const { isFirstTime, setIsFirstTime } = useIsFirstTime(
    (state: IsFirstTime) => state
  );

  const handleSend = () => {
    // setMessages([value]);
    setValue("");

    if (isFirstTime) {
      localStorage.setItem("step", "1");

      return socket.emit("initConvo");
    }
    if (localStorage.getItem("step") == "1") {
      //Buy home

      if (inputRef.current?.value === "1") {
        localStorage.setItem("step", "11");
        setActionType(1);

        return socket.emit(Events.BUYHOME);
      }
      if (inputRef.current?.value === "2") {
        localStorage.setItem("step", "11");
        setActionType(2);

        return socket.emit(Events.BUYHOME);
      }
      if (inputRef.current?.value === "3") {
        localStorage.setItem("step", "11");
        setActionType(3);

        return socket.emit(Events.BUYHOME);
      }
      //other options
      return;
    }

    if (localStorage.getItem("step") == "1111") {
      setPrice(value);
      localStorage.setItem("step", "11111");
      return socket.emit(Events.COMMERCIALPRICERANGE, value);
    }
    if (localStorage.getItem("step") == "11") {
      if (inputRef.current?.value === "1") {
        localStorage.setItem("step", "111");
        setHouseType(1);

        return socket.emit(Events.BUYCOMMERCIAL);
      }
      if (inputRef.current?.value === "2") {
        localStorage.setItem("step", "111");
        setHouseType(2);

        return socket.emit(Events.BUYCOMMERCIAL);
      }
      if (inputRef.current?.value === "3") {
        localStorage.setItem("step", "111");
        setHouseType(3);

        return socket.emit(Events.BUYCOMMERCIAL);
      }

      //other options
      return;
    }

    if (localStorage.getItem("step") == "111") {
      if (inputRef.current?.value === "1") {
        localStorage.setItem("step", "1111");
        setLocation("1");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "2") {
        localStorage.setItem("step", "1111");
        setLocation("2");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "3") {
        localStorage.setItem("step", "1111");
        setLocation("3");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "4") {
        localStorage.setItem("step", "1111");
        setLocation("4");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "5") {
        localStorage.setItem("step", "1111");
        setLocation("5");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      return;
    }
    if (localStorage.getItem("step") == "111") {
      if (inputRef.current?.value === "1") {
        localStorage.setItem("step", "1111");
        setLocation("1");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "2") {
        localStorage.setItem("step", "1111");
        setLocation("2");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "3") {
        localStorage.setItem("step", "1111");
        setLocation("3");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "4") {
        localStorage.setItem("step", "1111");
        setLocation("4");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      if (inputRef.current?.value === "5") {
        localStorage.setItem("step", "1111");
        setLocation("5");
        return socket.emit(Events.GETCOMMERCIALPRICE);
      }
      return;
    }
    if (localStorage.getItem("step") == "11111") {
      if (inputRef.current?.value == "1") {
        localStorage.setItem("step", "1111");

        return socket.emit(Events.AVAILABLECOMMERCIAL, {
          price,
          bedrooms: 1,
          location,
          houseType,
          actionType,
        });
      }
      if (inputRef.current?.value == "2") {
        localStorage.setItem("step", "1111");

        return socket.emit(Events.AVAILABLECOMMERCIAL, {
          price,
          bedrooms: 2,
          location,
          houseType,
          actionType,
        });
      }
      if (inputRef.current?.value == "3") {
        localStorage.setItem("step", "1111");

        return socket.emit(Events.AVAILABLECOMMERCIAL, {
          price,
          bedrooms: 3,
          location,
          houseType,
          actionType,
        });
      }
      if (inputRef.current?.value == "4") {
        localStorage.setItem("step", "1111");
        //remember to add price
        return socket.emit(Events.AVAILABLECOMMERCIAL, {
          bedrooms: 4,
          location: location?.toString(),
          houseType,
          actionType,
        });
      }
    }
  };
  React.useEffect(() => {
    localStorage.setItem("step", "0");
    setIsFirstTime(true);
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img width="50" height="50" src="./logo.png"></img>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              marginRight: "50px",
            }}
          >
            Chatter Estate
          </h1>
        </div>

        {messages.map((message, index) => (
          <div key={index} className="message">
            {typeof message === "object" ? (
              <>
                {message.message}
                {message.options && !message.list && (
                  <ol>
                    <li>{message.options["1"]}</li>

                    {message.options["2"] && <li>{message.options["2"]}</li>}

                    {message.options["3"] && <li>{message.options["3"]}</li>}
                    {message.options["4"] && <li>{message.options["4"]}</li>}
                    {message.options["5"] && <li>{message.options["5"]}</li>}
                  </ol>
                )}
                {message.options && message.list && (
                  <div className="property-options">
                    {Object.keys(message.options).map((key) => {
                      const option = JSON.parse(message.options[key]);
                      const location = getLocationString(option.location);
                      const type = getTypeString(option.houseType);
                      const features = getFeatures(option.features);
                      return (
                        <div className="property-card" key={key}>
                          <h3>{option.name}</h3>
                          <p>Price: KSH {option.price}</p>
                          <p>Number of bedrooms: {option.bedrooms}</p>
                          <p>Location: {location}</p>
                          <p>Description: {option.description}</p>
                          <p>House Type: {type}</p>
                          <p>
                            Agent Contact:{" "}
                            <a href={`tel:${option.agent}`}>{option.agent}</a>
                          </p>
                          <p>Available options: {option.actions}</p>
                          <p>Available features: {features}</p>
                          <p>Images:</p>
                          {/* Replace the src attribute with the appropriate URL */}
                          <img
                            style={{ margin: 5 }}
                            width="100"
                            height="100"
                            src={getOptionHouseTypeImage(option.houseType)}
                            alt="property"
                          />
                          <img
                            style={{ margin: 5 }}
                            width="100"
                            height="100"
                            src={getOptionHouseTypeImage2(option.houseType)}
                            alt="property"
                          />
                          <img
                            style={{ margin: 5 }}
                            width="100"
                            height="100"
                            src={getOptionHouseTypeImage3(option.houseType)}
                            alt="property"
                          />
                        </div>
                      );
                    })}

                    <p>{message?.conclusion}</p>
                  </div>
                )}
              </>
            ) : (
              message
            )}
          </div>
        ))}
      </div>

      <div
        className="chat-input"
        style={{
          top: "10000px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            console.log(localStorage.getItem("step") + "itss");
            setValue(e.target.value);
          }}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
        <button
          onClick={() => {
            clearMessages();
            setIsFirstTime(true);

            localStorage.setItem("step", "");
          }}
        >
          Reset chat
        </button>
      </div>
    </div>
  );
};

export default Chat;
