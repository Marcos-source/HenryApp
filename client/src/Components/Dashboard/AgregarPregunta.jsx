import React from "react";
import Dashboard from "./Dashboard";
import axios from 'axios';
import Swal from "sweetalert2";

function AddProducto() {
  const [quizz, setQuizz] = React.useState([]);

  const initialState = {
    pregunta: "",
    correcta: "",
    incorrecta1: "",
    incorrecta2: "",
    incorrecta3: "",
    idclase:""
  };

  const [form, setForm] = React.useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
        setForm(initialState);
        Swal.fire('Guardado')
  };

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  var clase = [{id:1,name:'JS I'}]
  const optionQuizz = clase.map((option) => (
    <option key={option.id} value={option.id}>
      {option.id} - {option.name}
    </option>
  ));

  return (
    <div class="bg-dark">
      <Dashboard />
      <div class="bg-info p-2">
        <h3>Agregar Preguntas</h3>
      </div>
      <div class="container">
        <form class="form-group" onSubmit={handleSubmit}>
          <div class="row">
            <div class="col-6 mt-3">
              <input
                type="text"
                required
                name="pregunta"
                value={form.pregunta}
                onChange={updateField}
                className="form-control"
                placeholder="Pregunta"
              />
            </div>
          </div>
          <div class="row">
          <div class="col mt-3">
            <input
              type="text"
              required
              name="correcta"
              value={form.correcta}
              onChange={updateField}
              className="form-control"
              placeholder="Respuesta Correcta"
            />
          </div>
          <div class="col mt-3">
            <input
              type="text"
              required
              name="incorrecta1"
              value={form.incorrecta1}
              onChange={updateField}
              className="form-control"
              placeholder="Respuesta incorrecta"
            />
          </div>
          </div>
          <div class="row">
          <div class="col mt-3">
            <input
              type="text"
              required
              name="incorrecta2"
              value={form.incorrecta2}
              onChange={updateField}
              className="form-control"
              placeholder="Respuesta incorrecta"
            />
          </div>
          <div class="col mt-3">
            <input
              type="text"
              required
              name="incorrecta3"
              value={form.incorrecta3}
              onChange={updateField}
              className="form-control"
              placeholder="Respuesta incorrecta"
            />
          </div>
          </div>
          <div class="row mt-3">
            <div className="col">
              <label className="text-white" htmlFor="marca">
                Quizz
              </label>
              <select
                required
                onChange={updateField}
                value={form.idclase}
                className="form-control"
                name="idclase"
                id="idclase"
              >
                <option value="">Seleccione un Quizz</option>
                {optionQuizz}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <input type="submit" className="my-3 btn btn-primary btn-block" value="Guardar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProducto;
