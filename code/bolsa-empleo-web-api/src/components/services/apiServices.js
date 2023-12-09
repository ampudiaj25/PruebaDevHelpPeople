import axios from 'axios';

export const obtenerTiposDocumentos = async () => {
  let data = [];
  await axios.get('https://localhost:44318/api/TiposDocumento')
    .then((response)=> {      
      data = response && response.data ? response.data : [];
    })
    .catch((error) =>{
      console.log(error);
    });

  return data;
};

export const crearCiudadano = async (data) => {
  let result = true;
  await axios.post('https://localhost:44318/api/Ciudadanos', data)
    .then((response)=> {
      console.log(response);
    })
    .catch((error) =>{
      result = false;
      console.log(error);
    });

  return result;
};


export const obtenerCiudadanos = async () => {
  let data = [];
  await axios.get('https://localhost:44318/api/Ciudadanos')
  .then((response)=> {
      data = response.data;
    })
    .catch((error) =>{
      console.log(error);
    });

  return data;
};

export const editarCiudadano = async (data) => {
  let result = true;  
  await axios.put('https://localhost:44318/api/Ciudadanos', data)
    .then((response)=> {
      console.log(response);
    })
    .catch((error) =>{
      result = false;
      console.log(error);
    });

  return result;
};

export const eliminarCiudadano = async (id) => {
  let result = true;  
  await axios.delete(`https://localhost:44318/api/Ciudadanos/${id}`)
    .then((response)=> {
      console.log(response);
    })
    .catch((error) =>{
      result = false;
      console.log(error);
    });

  return result;
};

export const obtenerVacantes = async () => {
  let data= [];
  await axios.get('https://localhost:44318/api/Vacantes')
    .then((response)=> {
      data = response.data;
    })
    .catch((error) =>{
      console.log(error);
    });

  return data;
};

export const obtenerAspirantesPostulacion = async () => {
  let data = [];
  await axios.get('https://localhost:44318/api/Ciudadanos/aspirantesPostulacion')
    .then((response)=> {
      data = response.data;
    })
    .catch((error) =>{
      console.log(error);
    });

  return data;
};

export const aplicarVacante = async (data) => {
  let result = true;    
  await axios.post(`https://localhost:44318/api/Vacantes`,data)
    .then((response)=> {
      console.log(response);
    })
    .catch((error) =>{
      result = false;
      console.log(error);
    });

  return result;
};