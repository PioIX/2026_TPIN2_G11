import ChatItem from "./ChatItem";

export default function ChatList({ chats }) {
  return (
    <ul>
      {chats.map((nombre, foto) => {
        return <ChatItem nombre={nombre} foto={foto}></ChatItem>;
      })}
    </ul>
  );
}
