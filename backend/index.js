import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Property } from "./seedDatabase.js";
import { v4 as uuidv4 } from "uuid";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow requests from all origins
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

// Handle root URL
app.get("/", (req, res) => {
  // Emit welcome message to all connected clients
  io.emit("initConvo", {
    message: `Welcome to Chatter estate. This is Our real estate chatbot! How can I help you?`,
    options: {
      1: "Buy a home",
      2: "Rent an apartment",
      3: "Featured listings",
    },
    id: uuidv4(),
  });
  res.status(200).json(`conversation initiated`);
});

// Listen for connection event
io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for the "greeting" event from the client
  socket.on("initConvo", () => {
    // Respond with a welcome message and options
    socket.emit("initConvo", {
      message: `Welcome to Chatter estate. This is Our real estate chatbot! press 1 to search a home`,
      options: {
        1: "Search a home",
        2: "",
        3: "",
      },
      id: uuidv4(),
    });
  });
  socket.on("listings", async () => {
    const listings = await Property.find();
    socket.emit("listings", listings);
  });

  socket.on("buyhome", async () => {
    console.log("buying home");
    socket.emit("buyhome", {
      message: "Please specify the type of home you want",
      options: {
        1: "Commercial",
        2: "Houses",
        3: "Apartments",
      },
      id: uuidv4(),
    });

    socket.on("buyhouses", async () => {
      socket.emit("buyhouses", {
        message: "What is your preferred location?",
        options: {
          1: "Nakuru",
          2: "Nairobi",
          3: "Kiambu",
          4: "Mombasa",
          5: "Eldoret",
          6: "Kisumu",
        },
        id: uuidv4(),
      });
    });

    socket.on("buycommercial", () => {
      console.log(`its called`);
      socket.emit("buycommercial", {
        message: "What is your preferred location?",
        options: {
          1: "Nakuru",
          2: "Nairobi",
          3: "Kiambu",
          4: "Mombasa",
          5: "Eldoret",
          6: "Kisumu",
        },
        id: uuidv4(),
      });
    });
    socket.on("buyapartments", () => {
      socket.emit("buyapartments", {
        message: "What is your preferred location?",
        options: {
          1: "Nakuru",
          2: "Nairobi",
          3: "Kiambu",
          4: "Mombasa",
          5: "Eldoret",
          6: "Kisumu",
        },
        id: uuidv4(),
      });
    });
  });

  socket.on("getcommercialPrice", () => {
    socket.emit("getcommercialPrice", {
      message: "Interesting! What's your maximum budget?",
    });
  });

  socket.on("commercialPriceRange", (data) => {
    socket.emit("commercialPriceRange", {
      message: "What number of bedrooms do you prefer?",
      options: {
        1: "1 bedroom",
        2: "2 bedrooms",
        3: "3 bedrooms",
        4: "4+ bedrooms",
      },
      id: uuidv4(),
    });
    //find houses
    console.log(data);
  });

  socket.on("availableCommercial", async (data) => {
    //find properties from the db
    const filters = {
      location: data.location,
      houseType: data.houseType,
      bedrooms: data.bedrooms,
      price: {
        $lte: data.price + 1000000,
      },
    };

    console.log(filters);
    const properties = await Property.find(filters);
    console.log(`properties length:${properties.length}`);
    if (properties.length == 0) {
      return socket.emit(
        "availableCommercial",
        "No properties matched your search!"
      );
    }

    const payload = {
      message: "Here are some recommended properties",
      options: {},
      id: uuidv4(),
      list: true,
      conclusion:
        "  Please contact the agent for more details! Thank you for using Chatter Estate.",
    };

    properties.forEach((property, index) => {
      payload.options[index + 1] = JSON.stringify(property);
    });
    console.log(payload);
    socket.emit("availableCommercial", payload);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the HTTP server
httpServer.listen(5000, () => {
  console.log(`app listening on port 5000`);
});
