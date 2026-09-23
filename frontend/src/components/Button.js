"use client"

function Button({color, funcion,text}){
    <>
        <button style={{backgroundColor:{color}}} onclick={funcion}>{text}</button>
    </>
}