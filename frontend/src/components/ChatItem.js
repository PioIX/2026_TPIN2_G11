"use client"

import "/ButtonNewChat.js";

export default function ChatItem({nombre, foto}) {
    const foto_default = "/foto_default.png";

    const foto_chat = foto || foto_default;

    return (
        <>
        <li> // agregar funcionalidad para seleccionar el chat y mostrarlo en la pantalla de chat
            <img src={foto_chat} alt={nombre} />
            <span>{nombre}</span>
        </li>
        </>
    )
}