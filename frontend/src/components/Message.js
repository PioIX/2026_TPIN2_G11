export default function Message({ mensaje, esDelUsuario }) {
    return (
        <li
            style={{
                display: "flex",
                justifyContent: esDelUsuario ? "flex-end" : "flex-start",
            }}
        >{mensaje.contenido}
        </li>
    );
}