const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

const usuarioRoutes = require('./routes/usuarioRoute');
const contatoRoutes = require('./routes/contatoRoute');
const uploadRoutes = require('./routes/uploadRoute');

app.use(express.json());
app.use(cors());
app.use('/usuarios', usuarioRoutes);
app.use('/contatos', contatoRoutes);
app.use('/upload', uploadRoutes);

module.exports = app;