// Adaptar el código para que funcione con el trabajo

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/navigation";

export default function Chat() {
  const searchParams = useSearchParams();
  const sala = searchParams.get("sala");
  const usuario = searchParams.get("usuario");
  const router = useRouter();
  const { socket, isConnected } = useSocket();

  const [mensaje, setMensaje] = useState("");
  const [conversacion, setConversacion] = useState([]);
  const [nuevaSala, setNuevaSala] = useState("");

  useEffect(() => {
    if (!socket || !sala) return;
    socket.emit("joinRoom", { room: sala });
  }, [socket, sala]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      setConversacion((prevConversacion) => [...prevConversacion, data]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const enviarMensaje = () => {
    if (!socket || !mensaje.trim() || !isConnected) return;
    socket.emit("sendMessage", { message: mensaje.trim() });
    setMensaje("");
  };

  return (
    <main>
      <h1>Usuario: {usuario}</h1>
      <h2>Sala actual: {sala}</h2>
      <input
        type="text"
        placeholder="Mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje} disabled={!isConnected}>
        Enviar
      </button>
      <input
        type="text"
        placeholder="Nueva sala"
        value={nuevaSala}
        onChange={(e) => setNuevaSala(e.target.value)}
      />
      <button
        onClick={
          nuevaSala != ""
            ? () => {
                router.replace(`/chat?sala=${nuevaSala}&usuario=${usuario}`);
                setConversacion([]);
              }
            : undefined
        }
      >
        Unirse a otra sala
      </button>
      <ul>
        {conversacion.map((msg, index) => (
          <li key={`${msg.room}-${index}`}>{msg.message}</li>
        ))}
      </ul>
    </main>
  );
}
