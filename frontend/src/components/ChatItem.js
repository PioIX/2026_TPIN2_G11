import { useRouter } from "next/navigation";

export default function ChatItem({ nombre, foto, id }) {
  const router = useRouter();
  const foto_default = "/foto_default.png";

  const foto_chat = foto || foto_default;

  return (
    <li>
      <button onClick={router.push(`/chat?sala=${id}&usuario=${usuario}`)}>
        <img src={foto_chat} alt={nombre} />
        <span>{nombre}</span>
      </button>
    </li>
  );
}
