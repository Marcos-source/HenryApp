import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function EditarModulo() {
  function editar(iden) {
    const res = axios.put(`http://localhost:3001/modulo/update/${iden}`,{
      idModulo:form.idModulo,
      name:form.name,
      description:form.description
    })
      .then((e) => {
        Swal.fire({
          title: "Guardado!",
          text: "El modulo se modifico con exito.",
          icon: "success",
          confirmButtonText: "Continuar",
        });
        setForm(initialState);
        window.location.href = "/admin/listarmodulo";
      })
      .catch((e) => {
        for (var prop in form) {
          if(form[prop]===undefined){
            Swal.fire({
              title: "Error!",
              text: "Parece que no has escrito un campo",
              icon: "error",
              confirmButtonText: "Continuar",
            });
          }
        }
        Swal.fire({
          title: "Error!",
          text: { e },
          icon: "error",
          confirmButtonText: "Continuar",
        });
      });
  }
  const [modulo, setModulo] = React.useState([]);

  const { id } = useParams();

  const initialState = {
    name: "",
    idCurso:0,
    description:""
  };
  const [form, setForm] = React.useState(initialState);
  const [visible, setVisible] = React.useState(true);

  const failId = () => {
    setVisible(false);
    Swal.fire({
      title: "Error",
      text: "El ID no existe, seleccione un ID valido para continuar",
      icon: "error",
      confirmButtonColor: "#3085d6",
      customClass: "my-swal",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.value) {

      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/modulo/" + id); //Obtiene los datos del producto por ID
      if (!response.data[0]) return failId();
      setForm(response.data[0]);
    };

    fetchData();
  }, []);
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
        <h3>Editar Modulo</h3>
      </div>
      <div class="container">
        <form class="form-group" onSubmit={handleSubmit}>
          <div class="row">
            <div class="col mt-3">
              <input
                type="text"
                required
                name="name"
                value={form.name}
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
                Curso
              </label>
              <select
                required
                onChange={updateField}
                value={form.idCurso}
                className="form-control"
                name="idCurso"
                id="idCurso"
              >
                <option value="">Seleccione un Curso</option>
                {optionCurso}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <input type="submit" onClick={()=>{editar(id)}} className="my-3 btn btn-primary btn-block" value="Guardar" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
