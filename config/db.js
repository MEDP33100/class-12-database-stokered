const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://samistokes8:mothLover@testcluster.zmdbqjl.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const databaseConnection = {
  client: client,
  run: async function () {
    try {
      const database = client.db("moths");
      const mothsCollection = database.collection("moths");

      const allMoths = await mothsCollection.find().toArray();
      console.log("Moths found:", allMoths);
    } catch (e) {
      console.error("Error accessing moths.moths:", e);
    } finally {
      await client.close();
    }
  },
};

module.exports = databaseConnection;
// databaseConnection.run();
