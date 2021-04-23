const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://apiserver:dmME9dDnXHZpCJX@cluster0.18y6w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const clientDB = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const databaseName = "destinations";
const collectionName = "listOfDestinations";

async function main() {
  try {
    await clientDB.connect();
    await listDB(clientDB);
  } catch (error) {
    console.log(error);
  }
}

//main().catch(console.error);

async function listDB(clientDB) {
  const dblist = await clientDB.db().admin().listDatabases();
  console.log("Databases:");
  dblist.databases.forEach((db) => console.log(`- ${db.name}`));
}

async function insertDestination(clientDB, newListing) {
  const result = await clientDB
    .db(databaseName)
    .collection(collectionName)
    .insertOne(newListing);
  console.log(`New destination was created with id:${result.insertedId}`);
}

async function deleteAllDestination(clientDB) {
  const result = await clientDB.db(databaseName).collection(collectionName);
  if (result !== undefined) {
    result.drop();
  }
  console.log("Destination List Removed");
}

async function deleteDestinationByUid(clientDB, uid) {
  const result = await clientDB
    .db(databaseName)
    .collection(collectionName)
    .deleteOne({ uid: uid });
  console.log(`Destination with UID ${uid} was removed ${result}`);
}

// const db = clientDB.connect((err) => {
//   const collection = clientDB.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("Connected to MongoDB");
//   console.log(collection);
//   collection
//     .insertOne({ name: "first", location: "seattle" })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   clientDB.close();
// });

module.exports = {
  clientDB,
  main,
  insertDestination,
  deleteAllDestination,
  deleteDestinationByUid,
};
