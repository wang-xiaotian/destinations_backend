// database
// const main = require("./localDB/index").main;
// const insertDestination = require("./localDB/index").insertDestination;
// const clientDB = require("./localDB/index").clientDB;
const defaultImg =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

const unsplashAPI =
  "https://api.unsplash.com/search/photos?client_id=CLnWpARpr78PvJHV7Y6ApKdMDkFoxb2eqr_UxKHeO5g&page=1&query=";

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
server.use(cors());
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

server.get("/firstPage", (req, res) => {
  //res.sendFile(__dirname + "/index.html");
  res.send(localDB[0]);
});

//   // POST
server.post("/postDesitination", (req, res) => {
  console.log(req.body);
  // TODO:
  // insertDestination(
  //   clientDB,
  //   createDestination(
  //     "1234567",
  //     "seattle",
  //     "where i live",
  //     "photo url",
  //     "space needle"
  //   )
  // );
  res.send("inserted");
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
  let photoUrl = query(location).then((response) => {
    let images = response.results;
    let url = images[random(images.length)].urls.thumb;
    return { uid, location, description, photo, name };
  });
}

// generate random index number for an array
function random(x) {
  return Math.floor(Math.random() * x);
}

async function query(term) {
  let api = unsplashAPI + term;
  try {
    const res = await axios.get(api);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

const localDB = [
  {
    uid: 23456,
    name: "Efiile tower",
    location: "Paris",
    photo: defaultImg,
    description: "Romantic place",
  },
  {
    uid: 34567,
    name: "The needle",
    location: "Seattle",
    photo: defaultImg,
    description: "Another Romantic place",
  },
];
