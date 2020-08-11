import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

function eliminar([id]) {
  Swal.fire({
    title: "¿Desea eliminar la Quizz?",
    text: `NUMERO DE QUIZZ : ${id}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, Eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if(result.isConfirmed===true){
      axios.delete(`http://localhost:3001/quizz/delete/${id}`)
        .then((res) => {
          Swal.fire("Eliminado!", "Quizz eliminada con exito", "success");
          window.location.href=`/admin/listarquizz`;
      })
      .catch(e=>{
        console.log(e);
        Swal.fire("Error!", "No se pudo eliminar la quizz", "error");
      })
    }
  });
}

export default function ListarQuizz(){
  const [quizz, setQuizz] = React.useState([]);

React.useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/quizz`); //obtiene todas las ordenes
    setQuizz(response.data);
  };

  fetchData();
}, []);
if(quizz.length!==0){
  var realQuizz=[];
  realQuizz = quizz;

}else {
  realQuizz=[];
}

  return (
    <div className="bg-dark">
      <Dashboard />
      <div className="bg-info p-2">
        <h3>Listado de Quizzes</h3>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th className="text-info" scope="col">
              Numero de Quizz
            </th>
            <th className="text-info" scope="col">
              Nombre
            </th>
            <th className="text-info" scope="col">
              Descripcion
            </th>
            <th className="text-info" scope="col">
              Numero de Clase
            </th>
            <th className="text-info" scope="col">
                Eliminar
            </th>
            <th className="text-info" scope="col">
                Modificar
            </th>
          </tr>
        </thead>
        <tbody>
        {realQuizz.map(q=>{
          return(<tr>
            <td style={{ width: "5%" }} className="text-white">
                    {q.id}
            </td>
            <td style={{ width: "5%" }} className="text-white">
                    {q.name}
            </td><td style={{ width: "5%" }} className="text-white">
                    {q.description}
            </td><td style={{ width: "5%" }} className="text-white">
                    {q.idclase}
            </td>
            <td style={{ width: "5%" }} className="bg-dark text-white">
                    <button class="btn btn-danger" onClick={()=>{eliminar([q.id])}}>Eliminar</button>
            </td>
            <td style={{ width: "5%" }} className="bg-dark text-white">
                    <Link to={{
                      pathname: `/admin/editarquizz/${q.id}`,
                    }}><button class="btn btn-warning">Modificar</button></Link>
            </td>
          </tr>);
        })}
        </tbody>
      </table>
    </div>
  );
};
