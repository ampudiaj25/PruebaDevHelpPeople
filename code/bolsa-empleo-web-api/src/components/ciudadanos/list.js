import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { editarCiudadano, eliminarCiudadano, obtenerCiudadanos, obtenerTiposDocumentos } from '../services/apiServices';

const TablaCiudadanos = () => {
    const [ciudadanos, setCiudadanos] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Cambia este valor según el número de registros que quieras mostrar por página
    const [tiposDocumentos, setTiposDocumentos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerCiudadanos();
                const tipos = await obtenerTiposDocumentos();
                setCiudadanos(data);
                setTiposDocumentos(tipos);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
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

    // Lógica para obtener los ciudadanos de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ciudadanos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                                        value={editedData[ciudadano.id]?.tipoDocumentoId || ciudadano.tipoDocumentoId}
                                        onChange={(e) => handleEdit(ciudadano.id, 'tipoDocumentoId', e.target.value)}
                                    >
                                        {tiposDocumentos.map((tipo) => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    tiposDocumentos.find(tipo => tipo.id === ciudadano.tipoDocumentoId)?.nombre || ciudadano.tipoDocumentoId
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        value={editedData[ciudadano.id]?.cedula || ciudadano.cedula}
                                        onChange={(e) => handleEdit(ciudadano.id, 'cedula', e.target.value)}
                                        disabled={ciudadano.id === editableId}
                                        className="form-control"
                                    />
                                ) : (
                                    ciudadano.cedula
                                )}
                            </td>
                            <td>
                                {editableId === ciudadano.id ? (
                                    <input
                                        className="custom-input"
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
                                        className="custom-input"
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
                                        className="custom-input"
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
                                        className="custom-input"
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
                                        className="custom-input"
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
                                        className="custom-input"
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
                                        <button className="btn btn-primary mr-2 flex-fill" onClick={() => handleSaveChanges(ciudadano.id)}>
                                            Guardar
                                        </button>
                                        {editableId === ciudadano.id && (
                                            <button
                                                className="btn btn-danger flex-fill"
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
                                            <button className="btn btn-success mr-2 flex-fill" onClick={() => handleEditable(ciudadano.id)}>
                                                Editar
                                            </button>
                                        )}
                                        <button className="btn btn-danger ml-2 flex-fill" onClick={() => handleEliminarCiudadano(ciudadano.id)}>
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
