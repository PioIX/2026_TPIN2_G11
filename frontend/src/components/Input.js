"use client"

function InputLogin({type, placeholder, text, title}){
    <>
        <legend>{title}</legend>
        <input type={type} placeholder={placeholder} required/>
    </>
}