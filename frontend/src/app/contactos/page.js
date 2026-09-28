"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ChatList from "@/components/ChatList";

export default function Contactos() {
  const searchParams = useSearchParams();
  const userID = Number(searchParams.get("usuario"));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const pedirChats = async () => {
      const listaChats = await fetch(
        `http://localhost:4000/getUsuariosChat?id_usuario=${userID}`
      );
      setChats(listaChats);
    };

    pedirChats();
  }, []);

  return (
    <main>
      <h1>¡Bienvenido/a!</h1>
      {chats &&
        chats.map((chat) => {
          <ChatList chats={chat} />;
        })}
    </main>
  );
}
