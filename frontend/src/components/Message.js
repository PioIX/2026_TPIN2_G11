export default function Message({ mensaje, remitente, usuarioActual}) {
    return (
            <li className={`message ${remitente === usuarioActual ? 'enviado' : 'recibido'}`}>{mensaje}</li>
    );
}