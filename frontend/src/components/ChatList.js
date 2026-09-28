import ChatItem from "./ChatItem";

export default function ChatList({ chats }) {
  // array con nombre y foto de cada chat
  return (
    <ul>
      {chats.map((chat) => {
        // nombre y foto de cada chat del array
        return (
          <ChatItem
            key={chat.id_chat}
            nombre={chat.nombre}
            foto={chat.foto}
            id={chat.id_chat}
          />
        );
      })}
    </ul>
  );
}
