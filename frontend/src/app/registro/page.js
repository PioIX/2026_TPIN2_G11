"use client"

import { useEffect, useState } from "react"

export default function RegistroPage(){
    const [username, setUsername] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassowrd] = useState("")
    const [foto, setFoto] = useState("")

    //seteos
    const escribirUser = (event) => {
        setUsername(event.target.value)
        console.log(username)
    }
    const escribirMail = (event) => {
        setMail(event.target.value)
        console.log(mail)
    }
    const escribirPassword = (event) => {
        setUsername(event.target.value)
        console.log(username)
    }
    const escribirFoto = (event) => {
        setFoto(event.target.value)
        console.log(foto)
    }

    useEffect(() => {
        if (username === "" || mail === "" || password === ""){
            return(
                <>
                    <Mensaje text={"Porfavor complete todos los campos"}></Mensaje>
                </>
            )
        }
    }, [username, mail, password, foto])

    const Registro = () =>{
        if (foto = ""){ //Pone la foto default si foto esta vacio
            setFoto()
        }

        const userInfo = {
            nombre: username,
            mail: mail,
            contraseña: constraseña,
            foto: foto,
            descripcion: "" //la descripcion default es nada obv :/
        }

        fetch('http://localhost:4000/postUsuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log('Usuario creado:', data);
            router.push("/login")
        });
    }


    return(
        <>
            <Title text={"Registro de usuario"}></Title>
            <Input title={"Username"} type={text} placeholder={"PepeC"} onChange={escribirUser}></Input>
            <Input title={"Mail"} type={text} placeholder={"Pepito123@gmail.com"} onChange={escribirMail}></Input>
            <Input title={"Password"} type={text} placeholder={"******"} onChange={escribirPassword}></Input>
            <Input title={"Photo"} type={text} placeholder={"https...."} onChange={escribirFoto}></Input>
            <p>(si no tiene una foto, puede dejarlo vacio.)</p>
            <Button funcion={Registro} text={"Registrar"} color={"green"}></Button>
            <hr></hr>
            <Button funcion={() => {router.push("/login")}} text={"Loggearme"} color={"blue"}></Button>
        </>
    );
}