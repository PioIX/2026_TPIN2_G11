"use client"

export default function Button({color,onClick,text}){
    return(
        <>
        <button style={{backgroundColor:{color}}} onClick={onClick}>{text}</button>
    </>
    )
}