import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

function eliminar([id]) {
  Swal.fire({
    title: "¿Desea eliminar el modulo?",
    text: `NUMERO DEL MODULO : ${id}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Si, Eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if(result.isConfirmed===true){
      axios.delete(`http://localhost:3001/modulo/delete/${id}`)
        .then((res) => {
          Swal.fire("Eliminado!", "Modulo eliminado con exito", "success");
          window.location.href=`/admin/listarmodulo`;
      })
      .catch(e=>{
        Swal.fire("Error!", "No se pudo eliminar el modulo", "error");
      })
    }
  });
}

export default function ListarModulo(){
  const [modulo, setModulo] = React.useState([]);

React.useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3001/modulo`); //obtiene todas las clases
    setModulo(response.data);
  };

  fetchData();
}, []);
if(modulo.length!==0){
  var realModulo=[];
  realModulo = modulo;
}else {
  //DATOS DE PRUEBA, DESCOMENTAR EL ARRAY DE AQUI ABAJO
  // realModulo=[]
  //BORRA O COMENTAR EL ARRAY DE ACA ABAJO
  realModulo=[{id:1,name:'HENRY PREP',description:"Introduccion",idCurso:1}];
}

  return (
    <div className="bg-dark">
      <Dashboard />
      <div className="bg-info p-2">
        <h3>Listado de Modulos</h3>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th className="text-info" scope="col">
              Numero de Modulo
            </th>
            <th className="text-info" scope="col">
              Nombre
            </th>
            <th className="text-info" scope="col">
              Descripcion
            </th>
            <th className="text-info" scope="col">
              Numero del Curso
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
        {realModulo.map(q=>{
          return(<tr>
            <td style={{ width: "5%" }} className="text-white">
                    {q.id}
            </td>
            <td style={{ width: "5%" }} className="text-white">
                    {q.name}
            </td>
            <td style={{ width: "5%" }} className="text-white">
                    {q.description}
            </td>
            <td style={{ width: "5%" }} className="text-white">
                    {q.idCurso}
            </td>
            <td style={{ width: "5%" }} className="bg-dark text-white">
                    <button class="btn btn-danger" onClick={()=>{eliminar([q.id])}}>Eliminar</button>
            </td>
            <td style={{ width: "5%" }} className="bg-dark text-white">
                    <Link to={{
                      pathname: `/admin/editarmodulo/${q.id}`,
                    }}><button class="btn btn-warning">Modificar</button></Link>
            </td>
          </tr>);
        })}
        </tbody>
      </table>
    </div>
  );
};
