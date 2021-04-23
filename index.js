// database
// const main = require("./localDB/index").main;
// const insertDestination = require("./localDB/index").insertDestination;
// const clientDB = require("./localDB/index").clientDB;
const {
  main,
  insertDestination,
  clientDB,
  deleteAllDestination,
  deleteDestinationByUid,
} = require("./localDB/index");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

//require express
const express = require("express");
const server = express();
server.use("/", cors());
server.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000; // 3000 or server system defined

server.listen(PORT, () => {
  console.log(`Listening Port...${PORT}`);
});

main();
// CRUD
// functions:   create  read    update  delete
// methods:     post    get     put     delete

// POST : sending post request to server
// expects {name, location, description} from user

// dbClient.connect(async (err) => {
//   const collection = dbClient.db("destination").collection("devices");
//   // perform actions on the collection object
//   console.log("Connected to MongoDB");
//   //console.log(collection);

//   // GET / => READ

server.get("/", (req, res) => {
  //res.sendFile(__dirname + "/index.html");
  res.send(localDB[0]);
});

//   // POST
server.post("/postDesitination", (req, res) => {
  console.log(req.body);
  // TODO:
  insertDestination(
    clientDB,
    createDestination(
      "1234567",
      "seattle",
      "where i live",
      "photo url",
      "space needle"
    )
  );
  res.send("inserted");
  //   db.main(server).then((x) => {
  //     res.redirect("/");
  //   });
});

// PUT
server.put("/putDestination", (req, res) => {
  //insertDestination(clientDB, localDB[0]);
  console.log(req.query);
  console.log(req.query.uid);
  console.log(req.query.description);
  console.log(req.body);
  //   localDB.push(
  //     createDestination(req.query.uid, "", req.query.description, "", "", "")
  //   );
  res.send(localDB);
});

server.delete("/deleteAllDestination", (req, res) => {
  deleteAllDestination(clientDB);
  res.send("deleted all");
});

server.delete("/deleteDestinationByUid", (req, res) => {
  deleteDestinationByUid(clientDB, req.query.uid);
  res.send("delete uid");
});

function createDestination(uid, location, description, photo, name) {
  return { uid, location, description, photo, name };
}

const localDB = [
  {
    uid: 23456,
    name: "Efiile tower",
    location: "Paris",
    photo: "url",
    description: "Romantic place",
  },
  {
    uid: 34567,
    name: "The needle",
    location: "Seattle",
    photo: "url",
    description: "Another Romantic place",
  },
];
