import ChatItem from "./ChatItem";

export default function ChatList({ chats }) { // array con nombre y foto de cada chat
  return (
    <ul>
      {chats.map((nombre, foto) => { // nombre y foto de cada chat del array
        return <ChatItem nombre={nombre} foto={foto}></ChatItem>;
      })}
    </ul>
  );
}
