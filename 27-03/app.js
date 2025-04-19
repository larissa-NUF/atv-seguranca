const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

var token;

app.post("/register", (req, res) => {
  console.log(req.body.token);
  token = req.body.token;
  res.send("token");
});

var Notify = true;
const intervalDuration = 1000; // (1sec) time after which it checks the api response.
const pauseNotification = 30000;  // (30 sec) time for which it stops sending notifications

const getResponse = async () => {
  const apiUrl =
    "https://blynk.cloud/external/api/get?token={your_token}";
  const response = await axios.get(apiUrl);
  return response.data;
}

const sendNotification = async (msg) => {
  data = {
    to: token,
    sound: "default",
    body: msg,
  };
  await axios.post(
    "https://exp.host/--/api/v2/push/send",
    data
  );
}

const main = async () => {
  if (token !== undefined && Notify) {
    const responseData = await getResponse();
    if (responseData > 35) {
      Notify = false;
      const message = `Temperature has Increased to ${responseData}. Turn on Fan.`;
      await sendNotification(message)
      setTimeout(() => {
        Notify = true; // Set Notify to true after the delay time has elapsed
      }, pauseNotification);
    }
    else {
      console.log("Everything is under control")
    }
  } else if (!Notify) {
    console.log("Notification already sent. Waiting for delay to expire.");
  } else {
    console.log("Token is undefined");
  }
};

setInterval(main, intervalDuration);

const usuarioRoutes = require('./routes/usuarioRoute');
const contatoRoutes = require('./routes/contatoRoute');
const uploadRoutes = require('./routes/uploadRoute');

app.use(express.json());
app.use(cors());
app.use('/usuarios', usuarioRoutes);
app.use('/contatos', contatoRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;