import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function NuevoGrupoPopup(onClick) {
  // onClick es la funcion que va a crear el chat o no dependiendo de si los mails son validos
  return (
    <Popup trigger={<button> Crear grupo </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Ingrese el mail de cada usuario </div>
          <div className="content">
            {" "}
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
            <input type="text" placeholder="Mail del usuario" />
          </div>
          <div className="actions">
            <button onClick={onClick}>Crear grupo</button>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
