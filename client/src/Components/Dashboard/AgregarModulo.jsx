import React from "react";
import Dashboard from "./Dashboard";
import axios from 'axios';
import Swal from "sweetalert2";

function crear(name,description,idCurso) {
  const res = axios.post('http://localhost:3001/modulo/create',{
  name,
  idCurso,
  description
  })
  .then(r=>{
    Swal.fire('Guardado')
    window.location.href="http://localhost:3000/admin/listarmodulo"
  })
  .catch(e=>{
    Swal.fire('Error')
  })

  return res
}

export default function AgregarModulo() {
  const [modulo, setModulo] = React.useState([]);
  const initialState = {
    nombre: "",
    description:"",
    idCurso: 0,
  };

  const [form, setForm] = React.useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
        setForm(initialState);
  };

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  var curso = [{id:1,name:'Full-Stack'}]
  const optionCurso = curso.map((option) => (
    <option  key={option.id} value={option.id}>
      {option.id} - {option.name}
    </option>
  ));
  return (
    <div class="bg-dark">
      <Dashboard />
      <div class="bg-info p-2">
        <h3>Agregar Modulo</h3>
      </div>
      <div class="container">
        <form class="form-group" onSubmit={handleSubmit}>
          <div class="row">
            <div class="col mt-3">
              <input
                type="text"
                required
                name="nombre"
                value={form.nombre}
                onChange={updateField}
                className="form-control"
                placeholder="Nombre del Modulo"
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3">
              <input
                type="text"
                required
                name="description"
                value={form.description}
                onChange={updateField}
                className="form-control"
                placeholder="Descripcion"
              />
            </div>
          </div>
          <div class="row">
          </div>
          <div class="row mt-3">
            <div className="col">
              <label className="text-white" htmlFor="marca">
                Modulo
              </label>
              <select
                required
                onChange={updateField}
                value={form.idCurso}
                className="form-control"
                name="idCurso"
              >
                <option value="">Seleccione un Curso</option>
                {optionCurso}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <input type="submit" onClick={()=>{crear(form.nombre,form.description,form.idCurso)}} className="my-3 btn btn-primary btn-block" value="Guardar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
