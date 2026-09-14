export default function ChatItem({ nombre, foto }) {
  const foto_default = "/foto_default.png";

  const foto_chat = foto || foto_default;

  return (
    <li>
      <img src={foto_chat} alt={nombre} />
      <span>{nombre}</span>
    </li>
  );
}
