"use client"

import Title from "@/components/Title"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Mensaje from "@/components/Mensaje"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const router = useRouter();

    [mail,setMail] = useState("")
    [contraseña, setContraseña] = useState("")

    //setear contraseña y mail cuando lo escribe lel
    const escribirMail = (event) => { 
        setMail(event.target.value)
        console.log(mail)
    }
    const escribirContraseña = (event) => { 
        setContraseña(event.target.value)
        console.log(contraseña)
    }

    useEffect(() => {
        if (mail === "" || contraseña === ""){
            return(
                <>
                    <Mensaje text={"Porfavor complete todos los campos"}></Mensaje>
                </>
            )
        }
    }, [mail, contraseña])
    
    const Login = (mail, constraseña) => {
        if (mail === "" || constraseña === ""){
            return(
                <>
                    <Mensaje text={"Error, complete todos los campos."}></Mensaje>
                </>
            )   
        }

        const userInfo = {
            mail: mail,
            contraseña: constraseña
        }

        fetch('http://localhost:4000/postLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("userID", data.id)
        });

        if (data.length === 0){ //Si no existe, muestra error (en teoria ._.)
            return(
                <>
                    <Mensaje text={"Error, usuario o contraseña incorrecto."}></Mensaje>
                </>
            )
        }

        if (data.length != 0){ //si si existe, lo manda a la pagina de contactos
            router.push("/contactos?nombre=${data.nombre}")
        }
    }

    return(
        <>
            <Title text={"Login"}></Title>
            <Input title={"Mail"} type={text} placeholder={"pepito123@gmail.com"} onChange={escribirMail}></Input>
            <Input title={"Contraseña"} type={text} placeholder={"******"} onChange={escribirContraseña}></Input>
            <Button funcion={Login} text={"Login"} color={"green"}></Button>
            <hr></hr>
            <Button funcion={() => {router.push("/registro")}} text="Registrarme" color={"blue"}></Button>
        </>
    )
}