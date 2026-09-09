"use client"

import Title from "@/components/title"
import InputLogin from "@/components/Input"

export default function LoginRegistro(){


    return(
        <>
            <Title text={"Login"}></Title>
            <InputLogin title={"Mail"} type={text} placeholder={"pepito123@hotmail.com"}></InputLogin>
        </>
    )
}