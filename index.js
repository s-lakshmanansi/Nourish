"use strict";
const express = require("express");
const app = express();
const fs = require('fs').promises;
const util = require("util");
const glob = require("glob");
const globPromise = util.promisify(glob);
const multer = require("multer");
const mysql = require("mysql2/promise");
const cors = require("cors");
const { get } = require("http");
// const GoogleCloudStorage = require('@google-cloud/storage');
// const GOOGLE_CLOUD_PROJECT_ID = 'authentic-host-292819';
// const gcsHelpers = require('../helpers/google-cloud-storage');
// const DEFAULT_BUCKET_NAME = 'gcs-bucket-demo';
// const GOOGLE_CLOUD_KEYFILE = '../.env';

// const storage = GoogleCloudStorage({
//   projectId: GOOGLE_CLOUD_PROJECT_ID,
//   keyFilename: GOOGLE_CLOUD_KEYFILE,
// });

// const {Storage} = gcsHelpers;

app.use(cors());

const CLIENT_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MESSAGE = "A data base error occurred. Please try again later.";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

const db = mysql.createPool({
  host: process.env.DB_HOST || '35.192.117.206',
  database: process.env.DB_NAME || 'healthapp',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'A123456789Bc'
});

// exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

// exports.sendUploadToGCS = (req, res, next) => {
//   if (!req.file) {
//     return next();
//   }

//   const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
//   const bucket = storage.bucket(bucketName);
//   const gcsFileName = `${Date.now()}-${req.file.originalname}`;
//   const file = bucket.file(gcsFileName);

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype,
//     },
//   });

//   stream.on('error', (err) => {
//     req.file.cloudStorageError = err;
//     next(err);
//   });

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsFileName;

//     return file.makePublic()
//       .then(() => {
//         req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
//         next();
//       });
//   });

//   stream.end(req.file.buffer);
// };

// const multer1 = multer({
//   storage: multer.MemoryStorage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
//   },
// });

// router.post(
//   '/upload',
//   multer.single('image'),
//   gcsMiddlewares.sendUploadToGCS,
//   (req, res, next) => {
//     if (req.file && req.file.gcsUrl) {
//       return res.send(req.file.gcsUrl);
//     }

//     return res.status(500).send('Unable to upload');
//   },
// );

app.get('/all', async (req, res) => {
  try {
    let resultList = {"Users": []};
    let users = await getAll();
    for (let i = 0; i < users.length; i++) {
      let user = {
        "name": users[i]["Username"],
        "email": users[i]["Email"]
      };
      resultList.Users.push(user);
    }
    res.status(200).json(resultList);
  } catch (error){
    console.error(error);
    res.status(SERVER_ERROR).json({"error": SERVER_ERROR_MESSAGE});
  }
});

app.post("/image", async (req, res) => {
  try {
    let image = req.body["imageUrl"];
    console.log(image);
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    if (username === undefined || password === undefined) {
      res.status(400).json({"error": "missing username or password parameter"});
    }
    let returns = await getPassword(username)
    let returnPassword = (returns.length > 0) ? returns[0]["Passwords"] : "";
    if (returnPassword === password) {
      res.status(200).json({"result": "correct"});
    } else {
      res.status(200).json({"result": "incorrect"});
    }
  } catch(error) {
    console.log(error);
    res.status(SERVER_ERROR).json({"error": SERVER_ERROR_MESSAGE});
  }
});

app.post("/personal", async (req, res) => {
  try {
    let username = req.body.username;
    if (!checkIfExist(username, "")) {
      res.status(300).json({"error": "username doesn't exists"});
    }
    let result = await getPersonalInfo(username);
    let returnObject = {
      "username": result[0]["Username"],
      "email": result[0]["Email"],
      "gender": result[0]["Gender"],
      "age": result[0]["Age"] > 0 ? result[0]["Age"] : "",
      "height": result[0]["Height"] > 0 ? result[0]["Height"] : "",
      "weight": result[0]["Weights"] > 0 ? result[0]["Weights"] : ""
    };
    return res.status(200).json(returnObject);
  } catch(error) {
    console.log(error);
    res.status(SERVER_ERROR).json({"error": SERVER_ERROR_MESSAGE});
  }
});

app.post("/credential", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let gender = req.body.gender;
    let age = req.body.age;
    let height = req.body.height;
    let weight = req.body.weight;
    if (await checkIfExist(username, email)) {
      res.status(205).json({"error": "the username or email alreay existed"});
    }
    if (username === undefined || password === undefined || email === undefined) {
      res.status(CLIENT_ERROR).json({"error": "missing username or password or email parameter"});
    }
    let info = [username, password, email, gender, age, height, weight];
    await createUser(info);
    res.status(200).json({"success": "successfully"});
  } catch(error) {
    console.log(error);
    res.status(SERVER_ERROR).json({"error": SERVER_ERROR_MESSAGE});
  }
});

app.post("/consumption", async (req, res) => {
  try {
    let username = req.body.username;
    if (!checkIfExist(username, "")) {
      res.status(300).json({"error": "username doesn't exists"});
    }
    let result = await getConsumption(username);
    let sum = 0;
    let foodSet = [];
    for (let i = 0; i < result.length; i++) {
      let food = {
        "name": result[i]["NameOfFood"],
        "calories": result[i]["Calories"]
      };
      foodSet.push(food);
      sum += result[i]["Calories"];
    }
    let returnResult = {};
    returnResult["total"] = sum;
    returnResult["FoodSet"] = foodSet;
    return res.status(200).json(returnObject);
  } catch(error) {
    console.log(error);
    res.status(SERVER_ERROR).json({"error": SERVER_ERROR_MESSAGE});
  }
});

async function getConsumption(username) {
  let query = "SELECT F.NameOfFood, F.Calories FROM Food F, Users U, UserConsumption UC WHERE U.Username = ? AND U.UserID = UC.UserID AND UC.FoodID = F.NID;";
  let [rows] = db.query(query, [username]);
  return rows;
}

async function getPersonalInfo(username) {
  let query = "SELECT * FROM Users WHERE Username = ?;";
  let [rows] = await db.query(query, [username]);
  return rows;
}

async function createUser(info) {
  let query = "INSERT INTO Users(Username, Passwords, Email, Gender, Age, Height, Weights) VALUES (?, ?, ?, ?, ?, ?, ?);";
  await db.query(query, info);
}

async function checkIfExist(username, email) {
  let query = "SELECT * FROM Users WHERE Username = ?;";
  let [rows] = await db.query(query, [username]);
  let query2 = "SELECT * FROM Users WHERE Email = ?;";
  let [rows1] = await db.query(query2, [email]);
  return (rows.lengths >= 1 || rows1.length >= 1);
}

async function getPassword(username) {
  let query = "SELECT * FROM Users WHERE Username=?;";
  let [rows] = await db.query(query, [username]);
  return rows;
}

async function getAll() {
  let query = "SELECT * FROM Users;";
  let [rows] = await db.query(query);
  return rows;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);