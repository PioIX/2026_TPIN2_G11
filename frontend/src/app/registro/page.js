"use client"

import { useState } from "react"

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



    return(
        <>
            <Title text={"Registro de usuario"}></Title>
            <Input title={"Username"} type={X} placeholder={X} onChange={escribirUser}></Input>
            <Input title={"Mail"} type={X} placeholder={X} onChange={escribirMail}></Input>
            <Input title={"Password"} type={X} placeholder={X} onChange={escribirPassword}></Input>
            <Input title={"Photo"} type={X} placeholder={X} onChange={escribirFoto}></Input>
            <Button funcion={handleRegister} text={"Registrar"}></Button>
            <hr></hr>
            <Button funcion={() => {router.push("/login")}} text={"Loggearme"}></Button>
        </>
    );
}