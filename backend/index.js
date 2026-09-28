const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Server } = require("socket.io");
const { realizarQuery } = require("./modulos/mysql.js");

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

// GET
app.get("/getUsuarios", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Usuarios_TP2;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getUsuariosChat", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT Chats_TP2.id_chat, Chats_TP2.nombre, Chats_TP2.foto FROM UsuariosChat_TP2 INNER JOIN Chats_TP2 ON UsuariosChat_TP2.id_chat = Chats_TP2.id_chat WHERE UsuariosChat_TP2.id_usuario = ${req.query.id_usuario};
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getChats", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Chats_TP2;
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

app.get("/getMensajes", async function (req, res) {
  console.log(req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Mensajes_TP2 WHERE id_chat = ${req.query};
    `);
  console.log({ respuesta });
  res.send(respuesta);
});

// GET LOGIN
app.get("/getLoginNombre", async function (req, res) {
  console.log("get /getloginnombre req.query:", req.query);
  const respuesta = await realizarQuery(`
        SELECT * FROM Usuarios_TP2 WHERE nombre = '${req.query.nombre}';
    `);
  console.log({ respuesta: respuesta });
  res.send(respuesta);
});

//post

app.post("/postUsuarios", async function (req, res) {
  console.log(req.body);
  let respuesta = await realizarQuery(
    `SELECT * FROM Usuarios_TP2 WHERE nombre = '${req.body.nombre}' AND contraseña = '${req.body.contraseña}' AND mail = '${req.body.mail}'`
  );
  if (respuesta.length == 0) {
    await realizarQuery(
      `INSERT INTO Usuarios_TP2(nombre, descripcion, foto, contraseña,) VALUES ('${req.body.nombre}', '${req.body.descripcion}', '${req.body.foto}', '${req.body.contraseña}', '${req.body.mail}')`
    );
  }
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postChats", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO Chats_TP2(nombre, foto) VALUES ('${req.body.nombre}', '${req.body.foto}')`
  );
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/postMensajes", async function (req, res) {
  console.log(req.body);
  const respuesta = await realizarQuery(
    `INSERT INTO Mensajes_TP2(contenido, imagen, id_usuario, id_chat) VALUES ('${req.body.contenido}', '${req.body.imagen}', ${req.body.partidas_totales}, ${req.body.id_chat})`
  );
  console.log({ respuesta });
  res.send(respuesta);
});
