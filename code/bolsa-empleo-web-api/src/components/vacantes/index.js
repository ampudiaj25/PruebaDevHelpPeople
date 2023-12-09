import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { aplicarVacante, obtenerAspirantesPostulacion, obtenerVacantes } from '../services/apiServices';

const Vacantes = () => {
  const [vacantes, setVacantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [aspirantes, setAspirantes] = useState([]);
  const [aspiranteSeleccionado, setAspiranteSeleccionado] = useState(null);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vacantes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const obtenerDatos = async () => {
        const data = await obtenerVacantes();
        setVacantes(data);
    };

    obtenerDatos();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostular = async (id) => {    
    try {
      setVacanteSeleccionada(id);
      const aspirantesData = await obtenerAspirantesPostulacion(); 
      setAspirantes(aspirantesData);
    } catch (error) {
      console.error('Error al obtener los aspirantes:', error);
    }
  };

  const handleAplicar = async () => {
    try {      
      let ciudadanoId = aspiranteSeleccionado;
      if(ciudadanoId == null && aspirantes && aspirantes.length === 1){
        ciudadanoId = aspirantes[0].id;
      }
      const data = {
        ciudadanoId,
        vacanteId: vacanteSeleccionada
      };            
      const resultado = await aplicarVacante(data);
      setRegistroExitoso(resultado);
    } catch (error) {
      console.error('Error al aplicar al aspirante a la vacante:', error);
    }finally{
      handleCancelar();
    }
  };

  const handleCancelar = () => {
    setVacanteSeleccionada(null);
    setAspiranteSeleccionado(null);
    setAspirantes([]);
  };

  const closeSuccessMessage = () => {
    setRegistroExitoso(false);
  };

  return (
    <div className="container mt-5">
      <h1>Vacantes</h1>
      {registroExitoso && (
        <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
          <span>¡Registro exitoso!</span>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeSuccessMessage}></button>
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Cargo</th>
            <th scope="col">Descripción</th>
            <th scope="col">Empresa</th>
            <th scope="col">Salario</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((vacante) => (
            <tr key={vacante.id}>
              <td>{vacante.codigo}</td>
              <td>{vacante.cargo}</td>
              <td>{vacante.descripcion}</td>
              <td>{vacante.empresa}</td>
              <td>{vacante.salario}</td>
              <td>
                {(vacanteSeleccionada == null || ( vacanteSeleccionada && vacante.id !== vacanteSeleccionada)) && 
                  <button className="btn btn-primary me-2" onClick={() => handlePostular(vacante.id)}>
                    Postular
                  </button>
                }
                {vacante.id === vacanteSeleccionada && (
                  <div>
                    <select
                      className="form-select mt-2"
                      aria-label="Default select example"
                      onChange={(e) => setAspiranteSeleccionado(e.target.value)}
                    >
                      {aspirantes.length > 0 ? (
                        aspirantes.map((aspirante) => (
                          <option key={aspirante.id} value={aspirante.id}>
                            {aspirante.nombres} {aspirante.apellidos}
                          </option>
                        ))
                      ) : (
                        <option>No hay aspirantes disponibles</option>
                      )}
                    </select>
                    <div className="d-flex">
                      {aspirantes && aspirantes.length > 0 &&
                          <Button
                          className="btn btn-success mt-2 me-2 mr-2 flex-fill"
                          onClick={handleAplicar}
                        >
                          Aplicar
                        </Button>
                      }
                      <Button
                        className="btn btn-danger mt-2 mr-2 flex-fill"
                        onClick={handleCancelar}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(Math.ceil(vacantes.length / itemsPerPage)).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(vacantes.length / itemsPerPage)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Vacantes;
