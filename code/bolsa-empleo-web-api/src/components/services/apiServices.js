import axios from 'axios';



export const obtenerTiposDocumentos = () => {
  return axios.get('https://localhost:44318/api/TiposDocumento')
    .then(function (response) {
      return response.data.map(tipo => ({ id: tipo.id, nombre: tipo.nombre }));
    })
    .catch(function (error) {
      console.log(error);
      return [error]; // O maneja el error según tu lógica de la aplicación
    });
};

export const crearCiudadano = async (data) => {
  let result= true;
  await axios.post('https://localhost:44318/api/Ciudadanos', data)
  .then(function (response) {
    console.log(response);    
  })
  .catch(function (error) {
    result = false;
    console.log(error);
  });

  return result;
};


export const obtenerCiudadanos = async () => {
  let data;
  await axios.get('https://localhost:44318/api/Ciudadanos')
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

export const editarCiudadano = async (data) => {
  let result= true;
  debugger
  await axios.put('https://localhost:44318/api/Ciudadanos', data)
  .then(function (response) {
   
    console.log(response);    
  })
  .catch(function (error) {
    result = false;
    console.log(error);
  });

  return result;
};

export const eliminarCiudadano = async (id) => {
  try {
    const response = await axios.delete(`https://localhost:44318/api/Ciudadanos/${id}`); 
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar el ciudadano: ${error.message}`);
  }
};