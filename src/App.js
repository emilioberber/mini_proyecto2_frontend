import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // IMPORTANDO BOOTSTRAP
import Swal from 'sweetalert2'

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  // lista con los empleados para el get y mostrarlos
  const[empleadosList, setEmpleados] = useState([])

  const add = () =>{
    Axios.post("http://localhost:3001/create", {
      nombre:nombre, 
      edad:edad, 
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con éxito</i>",
        icon: 'success'
      })
      /* .catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message === "Network Error" ? "Error en el servidor, inténtelo más tarde" : error.message
        });
      }); */
    })
  }

  const update = () =>{
    Axios.put("http://localhost:3001/update", {
      id:id, 
      nombre:nombre, 
      edad:edad, 
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con éxito</i>",
        icon: 'success'
      })/* .catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        })
      }) */
    })
  }

  const deleteEmple = (val) =>{

    Swal.fire({
      title: 'Confirmar eliminado',
      html: "<i>¿Realmente desea eliminar a <strong>"+val.nombre+"</strong> ?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getEmpleados();
          limpiarCampos();
          Swal.fire(
            'Eliminado!',
            val.nombre+' fue eliminado!',
            'success',
            3000
          )
        })/* .catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        }) */
      }
    });

  }

  const limpiarCampos =()=>{
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");

    setEditar(false);
  }

  const editarEmpleado = (val) =>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = () =>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data); // response.data es para que la api traiga TODOS LOS DATOS
    })
    .catch(error =>{
      console.error(error);
    })
  }

  getEmpleados();

  return (
  <div className='App'>
    <div className="container">

    <div className="card text-center">
      <div className="card-header">
        GESTIÓN EMPLEADOS STARBUCKS
      </div>
      <div className="card-body">
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" 
          onChange={(event) =>{
            setNombre(event.target.value);
          }}
          className="form-control" value={nombre} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad:</span>
          <input type="number" 
          onChange={(event) =>{
            setEdad(event.target.value);
          }}
          className="form-control" value={edad} placeholder="Ingrese Edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">País:</span>
          <input type="text" 
          onChange={(event) =>{
            setPais(event.target.value);
          }}
          className="form-control" value={pais} placeholder="Ingrese País de Nacimiento" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo:</span>
          <input type="text" 
          onChange={(event) =>{
            setCargo(event.target.value);
          }}
          className="form-control" value={cargo} placeholder="Ingrese Cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
          <input type="number" 
          onChange={(event) =>{
            setAnios(event.target.value);
          }}
          className="form-control" value={anios} placeholder="Ingrese Años de Experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

      </div>
      <div className="card-footer text-muted">
        {
          editar? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Registrar</button>
        }
      </div>
    </div>

    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">País</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

          {
            empleadosList.map((val, key)=>{
              return <tr key={val.id}>
                        <th>{val.id}</th>
                        <td>{val.nombre}</td>
                        <td>{val.edad}</td>
                        <td>{val.pais}</td>
                        <td>{val.cargo}</td>
                        <td>{val.anios}</td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" 
                            onClick={()=>{
                              editarEmpleado(val);
                            }}
                            className="btn btn-info">Editar</button>
                            <button type="button" onClick={()=>{
                              deleteEmple(val);
                            }} className="btn btn-danger">Eliminar</button>
                          </div>
                        </td>
                      </tr>
      
            })
          }
      
      </tbody>   
    </table>

    </div>
  </div>
  
  );
}

export default App;
