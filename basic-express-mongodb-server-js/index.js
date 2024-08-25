const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const testCollection = client.db("demo").collection("test");

    // ==============================================================
    // Fish COLLECTION
    // ==============================================================

    // // post Fish
    // app.post("/api/v1/fish", async (req, res) => {
    //     const newFish = req.body;
  
    //     // Insert supply donation into the database
    //     await fishesCollection.insertOne(newFish);
  
    //     res.status(201).json({
    //       success: true,
    //       message: "Fish inserted successfully",
    //     });
    //   });
  
    //   // get Fishes
    //   app.get("/api/v1/fishes", async (req, res) => {
    //     const result = await fishesCollection.find().toArray();
  
    //     res.status(201).json({
    //       success: true,
    //       message: "Fish retrieved successfully",
    //       data: result,
    //     });
    //   });

    // // get supply
    // app.get("/api/v1/supplies/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };

    //   const result = await suppliesCollection.findOne(query);

    //   res.status(201).json({
    //     success: true,
    //     message: "Supply retrieved successfully",
    //     data: result,
    //   });
    // });

    // // update supply
    // app.patch("/api/v1/supplies/:id", async (req, res) => {
    //   const updatedSupply = req.body;
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };

    //   const updateInDb = {
    //     $set: {
    //       supplyImg: updatedSupply.supplyImg,
    //       supplyTitle: updatedSupply.supplyTitle,
    //       supplyCategory: updatedSupply.supplyCategory,
    //       supplyQuantity: updatedSupply.supplyQuantity,
    //       supplyDesc: updatedSupply.supplyDesc,
    //     },
    //   };

    //   const result = await suppliesCollection.findOneAndUpdate(
    //     query,
    //     updateInDb
    //   );

    //   res.status(201).json({
    //     success: true,
    //     message: "Supply updated successfully",
    //   });
    // });

    // // delete supply
    // app.delete("/api/v1/supplies/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await suppliesCollection.deleteOne(query);

    //   res.status(201).json({
    //     success: true,
    //     message: "Supply deleted successfully",
    //     res: result,
    //   });
    // });


    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
