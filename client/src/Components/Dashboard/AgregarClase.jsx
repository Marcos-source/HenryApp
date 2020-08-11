import React from "react";
import Dashboard from "./Dashboard";
import axios from 'axios';
import Swal from "sweetalert2";

function crear(name,idmodulo) {
  const res = axios.post('http://localhost:3001/clase/create',{
  name,
  idmodulo
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

export default function AgregarClase() {
  const [clase, setClase] = React.useState([]);
  const initialState = {
    nombre: "",
    idmodulo: 0,
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
  var modulo = [{id:1,name:'HENRY-PREP'}]
  const optionModulo = modulo.map((option) => (
    <option  key={option.id} value={option.id}>
      {option.id} - {option.name}
    </option>
  ));

  return (
    <div class="bg-dark">
      <Dashboard />
      <div class="bg-info p-2">
        <h3>Agregar Clase</h3>
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
                placeholder="Nombre de la Clase"
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
                value={form.idclase}
                className="form-control"
                name="idmodulo"
              >
                <option value="">Seleccione una Modulo</option>
                {optionModulo}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <input type="submit" onClick={()=>{crear(form.nombre,form.idmodulo)}} className="my-3 btn btn-primary btn-block" value="Guardar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
