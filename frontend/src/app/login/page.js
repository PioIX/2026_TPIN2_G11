"use client"

import Title from "@/components/Title"
import InputLogin from "@/components/Input"
import Button from "@/components/Button"

import { useEffect, useState } from "react";

export default function LoginRegistro(){
    [mail,setMail] = useState("")
    [contraseña, setContraseña] = useState("")

    function escribirMail(event){ //setear mail lel
        setMail(event.target.value)
        console.log(mail)
    }

    function escribirContraseña(event){ //setear contraseña lol
        setContraseña(event.target.value)
        console.log(contraseña)
    }

    function Login(){
        async function login(mail, contraseña) {
            console.log("entre a login: ", mail, contraseña);

            const body = {
                mail: mail,
                contraseña: contraseña,
            };

            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };

            const respuesta = await fetch("http://localhost:4000/postLogin", opciones);
            const jsonRes = await respuesta.json();

            return jsonRes;
        }
    };

    async function handleLogin() {
        if (mail === "" || contraseña === "") {
            console.log("error, datos vacios");
            return;
        }

        const res = await login(mail, contraseña);
        console.log(res);
        if (res.length === 0) {
            console.log("Error: El usuario no existe o la contraseña es invalida");
            return;
        }
    }

    return(
        <>
            <Title text={"Login"}></Title>
            <InputLogin title={"Mail"} type={text} placeholder={"pepito123@hotmail.com"} onChange={escribirMail}></InputLogin>
            <InputLogin title={"Contraseña"} type={text} placeholder={"******"} onChange={escribirContraseña}></InputLogin>
            {(mail == "" || constraseña == "") ? (
                <p color="red">por favor complete todos los campos.</p>
            ) : (
                <Button funcion={handleLogin} text={"Ingresar"}></Button>
                )}
        </>
    )
}