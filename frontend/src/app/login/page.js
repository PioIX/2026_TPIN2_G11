"use client"

import Title from "@/components/Title"
import InputLogin from "@/components/Input"
import Button from "@/components/Button"

import { useEffect, useState } from "react";

export default function LoginRegistro(){
    [nombre,setNombre] = useState("")
    [contraseña, setContraseña] = useState("")

    function escribirMail(event){ //setear mail lel
        setNombre(event.target.value)
        console.log(nombre)
    }

    function escribirContraseña(event){ //setear contraseña lol
        setContraseña(event.target.value)
        console.log(contraseña)
    }

    async function login(nombre, contraseña) {
            console.log("entre a login: ", nombre, contraseña);

            const body = {
                nombre: nombre,
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
    };


    async function handleLogin() {
        if (nombre === "" || contraseña === "") {
            console.log("error, datos vacios");
            return;
        }

        const res = await login(nombre, contraseña);
        console.log(res);
        if (res.length === 0) {
            console.log("Error: El usuario no existe o la contraseña es invalida");
            return;
        }
    }

    /*useEffect(()=> {
        fetch("https://localhost:3000/postLogin")
        .then((response) => (response.json()))
        .then((data) => (setNombre(data.nombre)))
        .then((data) => (setContraseña(data.contraseña)))
    }, [])*/ /*Esto no va bien*/

    return(
        <>
            <Title text={"Login"}></Title>
            <InputLogin title={"Nombre de usuario"} type={text} placeholder={"XxPepito123xX"} onChange={escribirNombre}></InputLogin>
            <InputLogin title={"Contraseña"} type={text} placeholder={"******"} onChange={escribirContraseña}></InputLogin>
            {(nombre == "" || constraseña == "") ? (
                <p color="red">por favor complete todos los campos.</p>
            ) : (
                <Button funcion={handleLogin} text={"Ingresar"}></Button>
                )}
        </>
    )
}