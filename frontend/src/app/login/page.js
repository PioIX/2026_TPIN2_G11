"use client"

import Title from "@/components/Title"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Error from "@/components/Error"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const router = useRouter();

    const [mail,setMail] = useState("")
    const [contraseña, setContraseña] = useState("")

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
        console.log(contraseña)
    }, [contraseña])

    useEffect(() => {
        console.log(mail)
    }, [mail])

    /*useEffect(() => {
        if (mail === "" || contraseña === ""){
            return(
                <>
                    <Error text={"Porfavor complete todos los campos"}></Error>
                </>
            )
        }
    }, [mail, contraseña])*/

    const Registrar = () => {
        router.push("/registro")
    }
    
    function Login(mail, constraseña){
        console.log('mail:', mail, 'contraseña:',constraseña)
        if (mail === "" || constraseña === ""){
            return(
                <>
                    <Error text={"Error, complete todos los campos."}></Error>
                </>
            )   
        }

        const userInfo = {
            mail: mail,
            contraseña: constraseña
        }

        console.log(userInfo)

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
                    <Error text={"Error, usuario o contraseña incorrecto."}></Error>
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
            <Input title={"Mail"} type={"text"} placeholder={"pepito123@gmail.com"} onChange={escribirMail}></Input>
            <Input title={"Contraseña"} type={"text"} placeholder={"******"} onChange={escribirContraseña}></Input>
            <Button onClick={Login} text={"Login"} color={"green"}></Button>
            <Button onClick={Registrar} text={"Registrarme"} color={"blue"}></Button>
        </>
    )
}