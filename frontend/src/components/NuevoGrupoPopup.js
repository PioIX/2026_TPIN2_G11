import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

export default function NuevoGrupoPopup({ onClick }) {
  const [mails, setMails] = useState([""]);

  const actualizarMail = (index, valor) => {
    const nuevos = [...mails];
    nuevos[index] = valor;
    setMails(nuevos);
  };

  const agregarInput = () => setMails([...mails, ""]);

  return (
    <Popup trigger={<button> Crear grupo </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Ingrese el mail de cada usuario </div>
          <div className="content">
            {mails.map((mail, i) => (
              <input
                key={i}
                type="text"
                placeholder="Mail del usuario"
                value={mail}
                onChange={(e) => actualizarMail(i, e.target.value)}
              />
            ))}
            <button type="button" onClick={agregarInput}>
              Agregar otro usuario
            </button>
          </div>
          <div className="actions">
            <button
              onClick={() => onClick(mails.filter((m) => m.trim() !== ""))}
            >
              Crear grupo
            </button>
            <button className="button" onClick={close}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
