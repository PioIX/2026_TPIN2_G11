"use client";

// import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Message from "./Message.js";

export default function Chat() {
  const searchParams = useSearchParams();
  const sala = searchParams.get("sala");
  const userID = localStorage.getItem(userID);
  const router = useRouter();
  const { socket, isConnected } = useSocket();

  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);

  useEffect(() => {
    if (!sala) return;

    const pedirHistorial = async () => {
      const response = await fetch(
        `http://localhost:4000/getMensajes?id_chat=${sala}`
      );
      const data = await response.json();
      setConversacion(data);
    };

    pedirHistorial();
  }, [sala]);

  useEffect(() => {
    if (!socket) return;

    const mensajeEntrante = (data) => {
      setConversacion((prevConversacion) => [...prevConversacion, data.message]);
    };

    socket.on("newMessage", mensajeEntrante);

    return () => {
      socket.off("newMessage", mensajeEntrante);
    };
  }, [socket]);

  const guardarMensaje = async (nuevoMensaje) => {
    await fetch("http://localhost:4000/postMensajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoMensaje),
    });
  };

  const enviarMensaje = () => {
    if (!socket || !isConnected || !mensaje.trim() || !sala || !userID) return;

    const nuevoMensaje = {
      contenido: mensaje.trim(),
      imagen: "",
      id_usuario: userID,
      id_chat: sala,
    };

    socket.emit("sendMessage", { message: nuevoMensaje });

    guardarMensaje(nuevoMensaje);

    setMensaje("");
  };

  return (
    <main>
      <ul>
        {conversacion.map((msj, index) => (
          <Message
            key={msj.id ?? index}
            mensaje={msj}
            esDelUsuario={String(msj.id_usuario) === String(userID)}
          />
        ))}
      </ul>
      <input
        type="text"
        placeholder="Escribí tu mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>
        Enviar
      </button>
      <button onClick={() => {router.push(`/contactos`)}}>

      </button>
    </main >
  );
}