import React from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

import AgregarQuizz from './Components/Dashboard/AgregarQuizz.jsx';
import ListarQuizz from './Components/Dashboard/ListarQuizz.jsx';
import EditarQuizz from './Components/Dashboard/EditarQuizz.jsx';

import EditarClase from './Components/Dashboard/EditarClase.jsx';
import AgregarClase from './Components/Dashboard/AgregarClase.jsx';
import ListarClase from './Components/Dashboard/ListarClase.jsx';

import EditarModulo from './Components/Dashboard/EditarModulo.jsx';
import AgregarModulo from './Components/Dashboard/AgregarModulo.jsx';
import ListarModulo from './Components/Dashboard/ListarModulo.jsx';

import AgregarPregunta from './Components/Dashboard/AgregarPregunta.jsx';
import ListarPreguntas from './Components/Dashboard/ListarPreguntas.jsx';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/admin" component={Dashboard} />

        <Route exact path="/admin/agregarpregunta" component={AgregarPregunta} />
        <Route exact path="/admin/listarpreguntas" component={ListarPreguntas} />

        <Route exact path="/admin/agregarquizz" component={AgregarQuizz} />
        <Route exact path="/admin/listarquizz" component={ListarQuizz} />
        <Route exact path="/admin/editarquizz/:id" component={EditarQuizz} />

        <Route exact path="/admin/agregarclase" component={AgregarClase} />
        <Route exact path="/admin/listarclase" component={ListarClase} />
        <Route exact path="/admin/editarclase/:id" component={EditarClase} />

        <Route exact path="/admin/agregarmodulo" component={AgregarModulo} />
        <Route exact path="/admin/listarmodulo" component={ListarModulo} />
        <Route exact path="/admin/editarmodulo/:id" component={EditarModulo} />
      </BrowserRouter>
    </div>
  );
}

export default App;
