import ChatList from "./ChatList";
import NuevoChatPopup from "./NuevoChatPopup";
import NuevoGrupoPopup from "./NuevoGrupoPopup";
import { useState } from "react";

export default function Contactos() {
    const [chats, setChats] = useState([{}]); // array de objetos con nombre y foto de cada chat

    // Crear función para sacar los chats de la base de datos y ponerlos en el array

    // Crear función para crear nuevo chat y nuevo grupo, para pasar como prop a los popups y que puedan modificar el array de chats
    const nuevoChat = (mail) => {
    };

    const nuevoGrupo = (mails) => {
    };

    return (
        <main>
            <h1>Lista de contactos</h1>
            <ChatList chats={chats} />
            <NuevoChatPopup onClick={nuevoChat} />
            <NuevoGrupoPopup onClick={nuevoGrupo} />
        </main>
    );
}