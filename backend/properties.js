import fs from "fs";

// Define ranges and options
const locations = ["1", "2", "3", "4", "5"];
const bedroomsOptions = [1, 2, 3, 4];
const houseTypes = [1, 2, 3];
const featuresOptions = [3, 4, 5];
const agentPrefixes = ["071", "072", "073"];
const actionsOptions = ["for sale", "for rent", "for sale and rent"];

// Function to generate dummy Kenyan phone numbers
function generateAgentNumber() {
  const prefix =
    agentPrefixes[Math.floor(Math.random() * agentPrefixes.length)];
  const suffix = Math.floor(1000000 + Math.random() * 9000000); // Generates a 7-digit random number
  return prefix + suffix.toString().substring(1); // Ensures 7 digits after prefix
}

// Generate 60 records
const newRecords = [];
for (let i = 0; i < 60; i++) {
  const record = {
    name: "Property Name",
    price: (
      Math.floor(Math.random() * (30000000 - 500000 + 1)) + 500000
    ).toLocaleString(), // Adjusted max price to 30,000,000
    description: "Description of the property.",
    images: ["image1.jpg", "image2.jpg", "image3.jpg"],
    location: locations[Math.floor(Math.random() * locations.length)],
    bedrooms:
      bedroomsOptions[Math.floor(Math.random() * bedroomsOptions.length)],
    houseType: houseTypes[Math.floor(Math.random() * houseTypes.length)],
    features:
      featuresOptions[Math.floor(Math.random() * featuresOptions.length)],
    agent: generateAgentNumber(),
    actions: actionsOptions[Math.floor(Math.random() * actionsOptions.length)],
  };
  newRecords.push(record);
}

// Combine existing data with new records
const existingData = [
  // Your existing data goes here
];

const combinedData = existingData.concat(newRecords);

// Convert combinedData to JSON
const jsonData = JSON.stringify(combinedData, null, 2);

// Write JSON data to a file
fs.writeFile("properties.json", jsonData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("Data has been written to properties.json");
});
