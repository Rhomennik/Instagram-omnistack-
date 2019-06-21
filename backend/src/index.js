const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


// Conexao com DB MongoATLAS :)
mongoose.connect('mongodb+srv://dbRhome:20715060R@cluster0-n4gjz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

// Cirando novo middleware para comunicar com todos os Route o io
app.use ((req, res, next) => {
  req.io = io;
  
  next();
})

// Habilitando cors
app.use(cors());

// Chamando arquivo estatico no  caso A foto
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
//Importando Rotas de routes =)
app.use(require('./routes'));

server.listen(3333);