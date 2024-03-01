import mongoose from "mongoose";
import fs from "fs";

export const Property = mongoose.model("Property", {
  name: String,
  price: String,
  description: String,
  images: [String],
  location: String,
  features: [String],
  houseType: Number,
  bedrooms: Number,
  features: Number,
  agent: String,
  actions: String,
});

mongoose.connect("mongodb://localhost:27017/realty", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function savePropertiesFromJSONFile(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath);

    const properties = JSON.parse(jsonData);

    for (const property of properties) {
      const instance = new Property(property);
      await instance.save();
    }

    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
  }
}

const jsonFilePath = "properties.json";

savePropertiesFromJSONFile(jsonFilePath);
