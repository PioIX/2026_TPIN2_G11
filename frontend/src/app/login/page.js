"use client"

import Title from "@/components/Title"
import InputLogin from "@/components/Input"
import Button from "@/components/Button"

import { useEffect, useState } from "react";

export default function LoginRegistro(){
    [mail,setMail] = useState("")
    [contraseña, setUserContraseña] = useState("")
    
    useEffect(() => {

    }, [mail])

    function escribirMail(event){ //CAMBIAR ESTO, HACERLO EN EL BOTON
        setMail(event.target.value)
        console.log(mail)
    }

    function escribirContraseña(event){ //setear contraseña lol
        setContraseña(event.target.value)
        console.log(contraseña)
    }
    
    const Login = (mail, constraseña) => {
        if (mail === "" || constraseña === ""){
            return(
                <>
                    <p style={{color: "red"}}>Error, datos vacios.</p>
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

        if (data.length === 0){
            return(
                <>
                    <p style={{color:"red"}}>Error, usuario o contraseña incorrecto.</p>
                </>
            )
        }
    }

    return(
        <>
            <Title text={"Login"}></Title>
            <InputLogin title={"Mail"} type={text} placeholder={"pepito123@gmail.com"} onChange={escribirMail}></InputLogin>
            <InputLogin title={"Contraseña"} type={text} placeholder={"******"} onChange={escribirContraseña}></InputLogin>
        </>
    )
}