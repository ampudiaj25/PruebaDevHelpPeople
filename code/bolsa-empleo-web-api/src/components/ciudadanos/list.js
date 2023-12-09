import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { editarCiudadano, eliminarCiudadano, obtenerCiudadanos, obtenerTiposDocumentos } from '../services/apiServices';

const TablaCiudadanos = () => {
    const [ciudadanos, setCiudadanos] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [tiposDocumentos, setTiposDocumentos] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ciudadanos.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const obtenerDatos = async () => {
            const data = await obtenerCiudadanos();
            const tipos = await obtenerTiposDocumentos();
            setCiudadanos(data);
            setTiposDocumentos(tipos.map(tipo => ({ id: tipo.id, nombre: tipo.nombre })));
        };

        obtenerDatos();
    }, []);

    const handleEliminarCiudadano = async (id) => {
        try {
            await eliminarCiudadano(id);
            const updatedCiudadanos = ciudadanos.filter((ciudadano) => ciudadano.id !== id);
            setCiudadanos(updatedCiudadanos);
        } catch (error) {
            console.error('Error al eliminar el ciudadano:', error);
        }
    };

    const handleEdit = (id, key, value) => {        
        setEditedData({ ...editedData, [id]: { ...editedData[id], [key]: value } });
    };

    const handleEditable = (id) => {
        setEditableId(id);
    };

    const handleSaveChanges = async (id) => {
        try {
            const ciudadanoIndex = ciudadanos.findIndex((ciudadano) => ciudadano.id === id);
            const ciudadanoActual = ciudadanos[ciudadanoIndex];
            const ciudadanoData = editedData[id];

            if (ciudadanoData) {
                const ciudadanoCompleto = { ...ciudadanoActual, ...ciudadanoData };
                await editarCiudadano(ciudadanoCompleto);
                const updatedCiudadanos = [...ciudadanos];
                updatedCiudadanos[ciudadanoIndex] = ciudadanoCompleto;
                setCiudadanos(updatedCiudadanos);
            }

            setEditableId(null);
            setEditedData({});
        } catch (error) {
            console.error(`Error al guardar los cambios del ciudadano ${id}:`, error);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const obtenerNombreTipoDocumento = (ciudadano)=>{        
        const nombre = tiposDocumentos.find(tipo => tipo.id === ciudadano.tipoDocumentoId)
                                    ?.nombre || ciudadano.tipoDocumentoId

        return nombre;
    }

    return (
        <div className="container mt-5 overflow-auto">
            <h2>Ciudadanos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Tipo de Documento</th>
                        <th>Cédula</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Profesión</th>
                        <th>Aspiración Salarial</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((ciudadano) => (
                        <tr key={ciudadano.id}>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <select
                                        className="form-control"
                                        value={editedData[ciudadano.id]?.tipoDocumentoId || ciudadano.tipoDocumentoId}
                                        onChange={(e) => handleEdit(ciudadano.id, 'tipoDocumentoId', parseInt(e.target.value, 10) )}
                                    >
                                        {tiposDocumentos.map((tipo) => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    obtenerNombreTipoDocumento(ciudadano)
                                )}
                            </td>
                            <td>
                                <span>{ciudadano.cedula}</span>
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={editedData[ciudadano.id]?.nombres || ciudadano.nombres}
                                        onChange={(e) => handleEdit(ciudadano.id, 'nombres', e.target.value)}
                                    />
                                ) : (
                                    ciudadano.nombres
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={editedData[ciudadano.id]?.apellidos || ciudadano.apellidos}
                                        onChange={(e) => handleEdit(ciudadano.id, 'apellidos', e.target.value)}
                                    />
                                ) : (
                                    ciudadano.apellidos
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={editedData[ciudadano.id]?.fechaNacimiento || ciudadano.fechaNacimiento}
                                        onChange={(e) => handleEdit(ciudadano.id, 'fechaNacimiento', e.target.value)}
                                    />
                                ) : (
                                    ciudadano.fechaNacimiento
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={editedData[ciudadano.id]?.profesion || ciudadano.profesion}
                                        onChange={(e) => handleEdit(ciudadano.id, 'profesion', e.target.value)}
                                    />
                                ) : (
                                    ciudadano.profesion
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={editedData[ciudadano.id]?.aspiracionSalarial || ciudadano.aspiracionSalarial}
                                        onChange={(e) => handleEdit(ciudadano.id, 'aspiracionSalarial', e.target.value)}
                                    />
                                ) : (
                                    ciudadano.aspiracionSalarial
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={editedData[ciudadano.id]?.correo || ciudadano.correo}
                                        onChange={(e) => handleEdit(ciudadano.id, 'correo', e.target.value)}
                                    />
                                ) : (
                                    ciudadano.correo
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <div className="d-flex">
                                        <button 
                                            className="btn btn-primary mt-2 me-2 mr-2 flex-fill" 
                                            onClick={() => handleSaveChanges(ciudadano.id)}
                                        >
                                            Guardar
                                        </button>
                                        {editableId === ciudadano.id && (
                                            <button
                                                className="btn btn-danger mt-2 mr-2 flex-fill"
                                                onClick={() => {
                                                    setEditableId(null);
                                                    setEditedData({});
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="d-flex">
                                        {editableId !== ciudadano.id && (
                                            <button className="btn btn-success mt-2 me-2 mr-2 flex-fill" onClick={() => handleEditable(ciudadano.id)}>
                                                Editar
                                            </button>
                                        )}
                                        <button className="btn btn-danger mt-2 mr-2 flex-fill" onClick={() => handleEliminarCiudadano(ciudadano.id)}>
                                            Eliminar
                                        </button>
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
                    {[...Array(Math.ceil(ciudadanos.length / itemsPerPage)).keys()].map((number) => (
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
                        disabled={currentPage === Math.ceil(ciudadanos.length / itemsPerPage)}
                    />
                </Pagination>
            </div>
        </div>
    );
};

export default TablaCiudadanos;
