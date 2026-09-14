import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";

export default function NuevoChatPopup({ onClick }) {
  const [mail, setMail] = useState("");

  return (
    <Popup trigger={<button> Crear chat </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Ingrese el mail del usuario </div>
          <div className="content">
            <input
              type="text"
              placeholder="Mail del usuario"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="actions">
            <button onClick={() => onClick(mail)}>Crear chat</button>
            <button className="button" onClick={close}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}