import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import 'bootstrap/dist/css/bootstrap.css';

import BotonPreguntas from './Botones/BotonPreguntas.jsx';
import BotonRespuestas from './Botones/BotonRespuestas.jsx';
import BotonClases from './Botones/BotonClases.jsx';
import BotonCursos from './Botones/BotonCursos.jsx';
import BotonQuizz from './Botones/BotonQuizz.jsx';
import BotonModulos from './Botones/BotonModulos.jsx';

export default function Dashboard(){
return (
      <div class="contenPrin">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <span class="navbar-brand">Dashboard</span>
          <BotonPreguntas/>
          <BotonClases/>
          <BotonCursos/>
          <BotonQuizz/>
          <BotonModulos/>
          <div className="w-100">
            <h5 className="text-right text-white">Usuario: Admin</h5>
          </div>
        </nav>
      </div>
    );
};
