"use client"

export default function Input({type, placeholder, title, onChange}){
    return(
        <>
        <legend>{title}</legend>
        <input type={type} placeholder={placeholder} onChange={onChange}/>
    </>
    )
}