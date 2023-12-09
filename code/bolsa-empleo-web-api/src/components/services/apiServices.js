import axios from 'axios';

export const obtenerTiposDocumentos = async () => {
  let data;
  await axios.get('https://localhost:44318/api/TiposDocumento')
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
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