const express = require("express");
const cloudinary = require("cloudinary").v2;
const env = require("dotenv").config();


const app = express();

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudAPI,
  api_secret: process.env.cloudSecret
});

app.post("/upload", req => {
  const file = req.file.photo;
  console.log(file);
});

module.exports = cloudinary;
