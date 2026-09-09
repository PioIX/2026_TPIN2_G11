var express = require("express"); //Tipo de servidor: Express
var bodyParser = require("body-parser"); //Convierte los JSON
var cors = require("cors");

const { realizarQuery } = require("./modulos/mysql");

var app = express(); //Inicializo express

app.use(express.static('../front')); //Hago que el servidor sirva los archivos de la carpeta front

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
        SELECT * FROM UsuariosChat;
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
        SELECT * FROM Mensajes;
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


app.post("/postChats, async function (req, res) {
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



