const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const sessionMiddleware = session({
  secret: "supersarasa",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Servidor NodeJS corriendo en http://localhost:${PORT}/`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  const req = socket.request;

  socket.on("joinRoom", (data) => {
    if (req.session.room != undefined && req.session.room.length > 0) {
      socket.leave(req.session.room);
    }
    req.session.room = data.room;
    socket.join(req.session.room);

    io.to(req.session.room).emit("chat-messages", {
      user: req.session.user,
      room: req.session.room,
    });
  });
  5;

  socket.on("sendMessage", (data) => {
    io.to(req.session.room).emit("newMessage", {
      room: req.session.room,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

var express = require("express"); //Tipo de servidor: Express
var bodyParser = require("body-parser"); //Convierte los JSON
var cors = require("cors");

const { realizarQuery } = require("./modulos/mysql");

var app = express(); //Inicializo express

app.use(express.static("../front")); //Hago que el servidor sirva los archivos de la carpeta front

var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
});

// GET
app.get("/getUsuarios", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Usuarios;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getUsuariosChat", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM UsuariosChat WHERE id_usuario = ${req.query} ;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getChats", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Chats;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getMensajes", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Mensajes WHERE id_chat = ${req.query};
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

//post

app.post("/postUsuarios", async function (req, res) {
  console.log(req.body);
  let respuesta = await realizarQuery(
    `SELECT * FROM Usuarios WHERE nombre = '${req.body.nombre}' AND descripcion = '${req.body.descripcion}' AND foto = '${req.body.foto}' AND contraseña = '${req.body.contraseña}'`
  );
  if (respuesta.length == 0) {
    await realizarQuery(
      `INSERT INTO Usuarios(nombre, descripcion, foto, contraseña,) VALUES ('${req.body.nombre}', '${req.body.descripcion}', '${req.body.foto}', '${req.body.contraseña}')`
    );
  }
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postChats", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO Chats(nombre, foto) VALUES ('${req.body.nombre}', '${req.body.foto}')`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postMensajes", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO Mensajes(contenido, imagen, id_usuario, id_chat) VALUES ('${req.body.contenido}', '${req.body.imagen}', ${req.body.partidas_totales}, ${req.body.id_chat})`
  );
  console.log({ respuesta });
  res.send(respuesta);
});
