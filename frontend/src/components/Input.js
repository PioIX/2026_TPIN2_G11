"use client"

function InputLogin({type, placeholder, title}){
    <>
        <legend>{title}</legend>
        <input type={type} placeholder={placeholder} onChange={onChange} required/>
    </>
}