// database
// const main = require("./localDB/index").main;
// const insertDestination = require("./localDB/index").insertDestination;
// const clientDB = require("./localDB/index").clientDB;
const defaultImg =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

const unsplashAPI =
  "https://api.unsplash.com/search/photos?client_id=CLnWpARpr78PvJHV7Y6ApKdMDkFoxb2eqr_UxKHeO5g&page=1&query=";

import {
  main,
  insertDestination,
  clientDB,
  deleteAllDestination,
  deleteDestinationByUid,
} from "./database/index";
import express from "express";
import cors from "cors";
import { get } from "axios";
import { urlencoded } from "body-parser";

//require express
const server = express();
server.use(cors());
server.use(urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000; // 3000 or server system defined

server.listen(PORT, () => {
  console.log(`Listening Port...${PORT}`);
});

main(); // connect to data base
// CRUD
// functions:   create  read    update  delete
// methods:     post    get     put     delete

// POST : sending post request to server
// expects {name, location, description} from user
server.post("/postDesitination", (req, res) => {
  console.log(req.body);
  let newDestination = createDestination(
    "1234567",
    req.body.location,
    req.body.discription,
    "photo url",
    req.body.destinationName
  );
  // TODO:
  insertDestination(clientDB, newDestination);
  res.send(newDestination);
});

// GET / => READ
server.get("/firstLoad", (req, res) => {
  // get a list of destination
  res.send(localDB[0]);
});

// PUT
server.put("/putDestination", (req, res) => {
  //insertDestination(clientDB, localDB[0]);
  console.log(req.query);
  console.log(req.query.uid);
  console.log(req.query.description);
  console.log(req.body);
  // find

  // update

  res.send(localDB);
});

// delete all destination in database
server.delete("/deleteAllDestination", (req, res) => {
  deleteAllDestination(clientDB);
  res.send("deleted all");
});

// delete destination by uid
server.delete("/deleteDestinationByUid", (req, res) => {
  deleteDestinationByUid(clientDB, req.query.uid);
  res.send("delete uid");
});

// return json destination {uid, location, description, photo, name}
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

// return unsplash api data - img url
async function query(term) {
  let api = unsplashAPI + term;
  try {
    const res = await get(api);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
