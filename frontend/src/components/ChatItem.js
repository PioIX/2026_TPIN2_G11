import Link from 'next/link'

export default function ChatItem({ nombre, foto }) {
  const foto_default = "/foto_default.png";

  const foto_chat = foto || foto_default;

  return (
    <li onClick={router.push()}>
      <img src={foto_chat} alt={nombre} />
      <Link href="/chat">{nombre}</Link>
    </li>
  );
}
