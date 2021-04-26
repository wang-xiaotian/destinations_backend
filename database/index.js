const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://apiserver:dmME9dDnXHZpCJX@cluster0.18y6w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const clientDB = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const databaseName = "destinations";
const collectionName = "listOfDestinations";

// connect to database
async function main() {
  try {
    await clientDB.connect();
    await listDB(clientDB);
  } catch (error) {
    console.log(error);
  }
}

async function listDB(clientDB) {
  const dblist = await clientDB.db().admin().listDatabases();
  console.log("Databases:");
  dblist.databases.forEach((db) => console.log(`- ${db.name}`));
}

// insert one destination in database
async function insertDestination(clientDB, newListing) {
  try {
    const result = await clientDB
      .db(databaseName)
      .collection(collectionName)
      .insertOne(newListing);
    console.log("new destination inserted");
  } catch (error) {
    console.log(error);
  }
}

// return the list of all destinations
async function getAllDestinations(clientDB) {
  let list = await clientDB
    .db(databaseName)
    .collection(collectionName)
    .find({});
  return list;
}

// delete all destinations from database
// this verson only support one database
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
module.exports = {
  clientDB,
  main,
  insertDestination,
  deleteAllDestination,
  deleteDestinationByUid,
  getAllDestinations,
};
