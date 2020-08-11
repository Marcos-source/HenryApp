import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

function eliminar([id]) {
  Swal.fire({
    title: "¿Desea eliminar la Clase?",
    text: `NUMERO DE CLASE : ${id}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, Eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if(result.isConfirmed===true){
      axios.delete(`http://localhost:3001/clase/delete/${id}`)
        .then((res) => {
          Swal.fire("Eliminado!", "Clase eliminada con exito", "success");
          window.location.href=`/admin/listarclase`;
      })
      .catch(e=>{
        Swal.fire("Error!", "No se pudo eliminar la clase", "error");
      })
    }
  });
}

export default function ListarClase(){
  const [clase, setClase] = React.useState([]);

React.useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/clase`); //obtiene todas las clases
    setClase(response.data);
  };

  fetchData();
}, []);
if(clase.length!==0){
  var realClase=[];
  realClase = clase;

}else {
  //DATOS DE PRUEBA, DESCOMENTAR EL ARRAY DE AQUI ABAJO
  // realClase=[]
  //BORRA O COMENTAR EL ARRAY DE ACA ABAJO
  realClase=[{id:1,name:'JavaScrpipt Uno',idModulo:1}];
}

  return (
    <div className="bg-dark">
      <Dashboard />
      <div className="bg-info p-2">
        <h3>Listado de Clases</h3>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th className="text-info" scope="col">
              Numero de Clase
            </th>
            <th className="text-info" scope="col">
              Nombre
            </th>
            <th className="text-info" scope="col">
              Numero de Modulo
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
        {realClase.map(q=>{
          return(<tr>
            <td style={{ width: "5%" }} className="text-white">
                    {q.id}
            </td>
            <td style={{ width: "5%" }} className="text-white">
                    {q.name}
            </td><td style={{ width: "5%" }} className="text-white">
                    {q.idModulo}
            </td>
            <td style={{ width: "5%" }} className="bg-dark text-white">
                    <button class="btn btn-danger" onClick={()=>{eliminar([q.id])}}>Eliminar</button>
            </td>
            <td style={{ width: "5%" }} className="bg-dark text-white">
                    <Link to={{
                      pathname: `/admin/editarclase/${q.id}`,
                    }}><button class="btn btn-warning">Modificar</button></Link>
            </td>
          </tr>);
        })}
        </tbody>
      </table>
    </div>
  );
};
