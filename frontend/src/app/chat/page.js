"use client";

// import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/navigation";
import Message from "./Message.js";

export default function Chat() {
  const sala = searchParams.get("sala");
  const userID = localstorage.getItem("userID")
  const router = useRouter();
  const { socket, isConnected } = useSocket();

  const [mensaje, setMensaje] = useState([])

  useEffect(()=>{
      socket.emit("joinRoom", { room: sala });
  },[])

  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:4000/getMensajes/id_chat={}');
        const data = await response.json();
        console.log(data);
      };
      fetchData();
    }, []);



  useEffect(() => {
    if (!socket || !sala) return;

    socket.on("joinRoomOk", ()=>{
      console.log("se unio a la sala correctamente")
    })

    socket.on("newMessage", (data)=>{
      setNewMessage((mensajePrevios)=>{

        ...mensajePrevios, data.newMessage;

      })
      console.log("llego un mensaje de otra persona")
    })

    
  }, [socket]);



  const handleNewMessage = (data) => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/Mensajes`, {
          method: 'POST';
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoEstudiante)
        });
      const data = await response.json();
      console.log(data);
    }
  };
    



  return (
  <>
  </>
  )


}

// Adaptar el código para que funcione con el trabajo

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useSocket } from "@/hooks/useSocket";
// import { useRouter } from "next/navigation";
// import Message from "./Message.js";

// export default function Chat() {
//   const searchParams = useSearchParams();
//   const sala = searchParams.get("sala");
//   const usuario = searchParams.get("usuario");
//   const router = useRouter();
//   const { socket, isConnected } = useSocket();
//   const userID = localstorage.getItem("userID");

//   const [mensaje, setMensaje] = useState("");
//   const [conversacion, setConversacion] = useState([]);
//   const [nuevaSala, setNuevaSala] = useState("");

//   useEffect(() => {
//     if (!socket || !sala) return;
//     socket.emit("joinRoom", { room: sala });
//   }, [socket, sala]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (data) => {
//       setConversacion((prevConversacion) => [...prevConversacion, data]);
//     };

//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [socket]);

//   const enviarMensaje = () => {
//     if (!socket || !mensaje.trim() || !isConnected) return;
//     socket.emit("sendMessage", { message: mensaje.trim() });
//     setMensaje("");
//   };

//   return (
//     <main>
//       <h1>Usuario: {usuario}</h1>
//       <h2>Sala actual: {sala}</h2>
//       <input
//         type="text"
//         placeholder="Mensaje"
//         value={mensaje}
//         onChange={(e) => setMensaje(e.target.value)}
//       />
//       <button onClick={enviarMensaje} disabled={!isConnected}>
//         Enviar
//       </button>
//       <input
//         type="text"
//         placeholder="Nueva sala"
//         value={nuevaSala}
//         onChange={(e) => setNuevaSala(e.target.value)}
//       />
//       <button
//         onClick={router.push(`/contactos`)}
//       >
//         Salir del chat
//       </button>
//       <ul>
//         {conversacion.map((msg, index) => (
//           <Message key={`${msg.room}-${index}`} mensaje={msg} remitente={}/>
//         ))}
//       </ul>
//     </main>
//   );
// }
