CREATE TABLE Usuarios_TP2 (
	id_usuario INT auto_increment PRIMARY KEY,
    nombre VARCHAR(40),
	descripcion VARCHAR(100),
	foto VARCHAR(255)
);
CREATE TABLE UsuariosChat_TP2 (
	id_usChat INT auto_increment PRIMARY KEY,
    id_usuario INT,
    CONSTRAINT fk_Usuario
    FOREIGN KEY (id_usuario)
    REFERENCES Usuarios_TP2(id_usuario),
    id_chat INT,
    CONSTRAINT fk_chat
    FOREIGN KEY (id_chat)
    REFERENCES Chats_TP2(id_chat)
);
CREATE TABLE Chats_TP2 (
	id_chat INT auto_increment PRIMARY KEY,
    nombre VARCHAR(40),
	foto VARCHAR(255)
);
CREATE TABLE Mensajes_TP2 (
	id_msj INT auto_increment PRIMARY KEY,
    contenido VARCHAR(255),
	imagen VARCHAR(255),
	id_usuario INT,
    CONSTRAINT fk_Usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES Usuarios_TP2(id_usuario),
    id_chat INT,
    CONSTRAINT fk_chats
    FOREIGN KEY (id_chat)
    REFERENCES Chats_TP2(id_chat)
);

INSERT INTO Usuarios_TP2(nombre, descripcion, foto, contraseña)
VALUES ("Jozusito", "Soy un vaitisito", "https://static.wikia.nocookie.net/clash-royale-esp/images/8/8e/MiniPEKKACard.webp/revision/latest/thumbnail/width/360/height/360?cb=20221210192528&path-prefix=es", "SoyUnVaitis123");
INSERT INTO Usuarios_TP2(nombre, descripcion, foto, contraseña)
VALUES ("Mechi", "Hola, me gustan los componentes", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJlph8ZckCK8OrHkvuQ0s7WLez79DFu7henUaUsiOSyjJ-Yi5LRdjsoI&s=10", "holis_:)");

INSERT INTO Chats_TP2 (nombre, foto)
VALUES ("Cumple de Vaitis", "https://static.wikia.nocookie.net/featteca/images/8/80/Jozu.png/revision/latest?cb=20220810162134&path-prefix=es");

INSERT INTO Mensajes_TP2 (contenido, imagen, id_usuario, id_chat)
VALUES ("Adios", "https://static.wikia.nocookie.net/omniversal-battlefield/images/0/0c/E09D12B0-AC08-40A4-B3AE-3F4A72676FD2.jpeg/revision/latest/scale-to-width-down/537?cb=20190211200828", 3,1);

INSERT INTO UsuariosChat_TP2 (id_usuario, id_chat)
VALUES (3, 1);