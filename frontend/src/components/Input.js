"use client"

function Input({type, placeholder, title}){
    <>
        <legend>{title}</legend>
        <input type={type} placeholder={placeholder} onChange={onChange} required/>
    </>
}