import { useState, useEffect } from "react"
import ChatList from "./ChatList"

export default function Contactos() {
    const userID = localstorage.getItem("userID")
    const [chats, setChats] = useState([])

    useEffect(()=>{
        const pedirChats = async() =>{
            const listaChats = await fetch(`http://localhost:4000/getUsuariosChat/${userID}`)
            setChats(listaChats)
        }

        pedirChats()

    },[])

    return (
        <main>
            {chats && listaChats.map((chat)=>{
                <ChatList chats={chat}/>
            })}    
        </main>
    )
}