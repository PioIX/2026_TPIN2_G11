"use client"

import { useState, useEffect } from "react";
import ChatList from "./ChatList";

export default function Contactos() {
  const userID = localstorage.getItem("userID");
  const [chats, setChats] = useState([]);
  const searchParams = useSearchParams();
  const user = searchParams.get("nombre");

  useEffect(() => {
    const pedirChats = async () => {
      const listaChats = await fetch(
        `http://localhost:4000/getUsuariosChat/${userID}`
      );
      setChats(listaChats);
    };

    pedirChats();
  }, []);

  return (
    <main>
      <h1>
        Bienvenido/a, <span>{user}</span>
      </h1>
      {chats &&
        chats.map((chat) => {
          <ChatList chats={chat} />;
        })}
    </main>
  );
}
