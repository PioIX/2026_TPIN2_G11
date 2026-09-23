export default function Message({ mensaje, remitente, usuarioActual}) {
    return (
        <div className={`message ${remitente === usuarioActual ? 'enviado' : 'recibido'}`}>
            <p>{mensaje}</p>
        </div>
    );
}