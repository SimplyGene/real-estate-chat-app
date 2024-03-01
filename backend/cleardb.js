import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function deleteAllCollections(mongoUri) {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get the list of collection names
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Delete each collection
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).drop();
      console.log(`Collection '${collection.name}' deleted.`);
    }

    console.log("All collections deleted successfully.");
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
}

// Example usage

deleteAllCollections("mongodb://localhost:27017/realty");
