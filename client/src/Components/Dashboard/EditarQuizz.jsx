import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";



export default function EditarQuizz() {
  function editar(iden) {
    const res = axios.put(`http://localhost:3001/quizz/update/${iden}`,{
      idclase:form.idClase,
      name:form.name,
      description:form.description
    })
      .then((e) => {
        Swal.fire({
          title: "Guardado!",
          text: "El producto se modifico con exito.",
          icon: "success",
          confirmButtonText: "Continuar",
        });
        setForm(initialState);
        window.location.href = "/admin/listarquizz";
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
  const [quizz, setQuizz] = React.useState([]);

  const { id } = useParams();

  const initialState = {
    name: "",
    description: "",
    idclase: "",
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
      const response = await axios.get("http://localhost:3001/quizz/" + id); //Obtiene los datos del producto por ID
      if (!response.data[0]) return failId();
      setForm(response.data[0]);
    };

    fetchData();
  }, []);
  var clase = [{id:1,name:'JS I'}]
  const optionQuizz = clase.map((option) => (
  <option  key={option.id} value={option.id}>
    {option.id} - {option.name}
  </option>
  ));
  return (
    <div class="bg-dark">
      <Dashboard />
      <div class="bg-info p-2">
        <h3>Editar Quizz</h3>
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
                placeholder="Nombre del Quizz"
              />
            </div>
          </div>
          <div class="row">
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
              placeholder="Descripcion del Quizz"
            />
          </div>
          </div>
          <div class="row mt-3">
            <div className="col">
              <label className="text-white" htmlFor="marca">
                Clase
              </label>
              <select
                required
                onChange={updateField}
                value={form.idclase}
                className="form-control"
                name="idclase"
                id="idclase"
              >
                <option value="">Seleccione una Clase</option>
                {optionQuizz}
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
