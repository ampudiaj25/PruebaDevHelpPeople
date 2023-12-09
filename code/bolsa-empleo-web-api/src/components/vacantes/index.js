import React from 'react';

const Vacantes = () => {
 

  return (
    <div className="container mt-5">
      <h1>Vacantes</h1>
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
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="btn btn-primary me-2" >Editar</button>
                <button className="btn btn-danger" >Eliminar</button>
              </td>
            </tr>
       
        </tbody>
      </table>
    </div>
  );
};

export default Vacantes;
