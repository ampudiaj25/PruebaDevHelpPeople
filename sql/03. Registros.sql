-- 3. creacion registros
USE [BolsaEmpleoDB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Insert Into TiposDocumento (nombre) 
Values ('Cédula de ciudadanía'),
       ('Cédula de Extranjería'),
       ('Pasaporte'), 
       ('Otro');

Insert Into Vacantes(codigo, cargo, descripcion, empresa, salario, estado)
Values 
    ('RS001', 'Ingeniero Industrial', 'Se requiere Ingeniero Industrial con mínimo 2 años de experiencia en Salud Ocupacional', 'EPM', 2500000, 1),
    ('RS002', 'Profesor de Química', 'Se requiere Químico con mínimo 3 años de experiencia en docencia.', 'INSTITUCIÓN EDUCATIVA IES', 1900000, 1),
    ('RS003', 'Ingeniero de Desarrollo Junior', 'Se requiere Ingeniero de Sistemas con mínimo 1 año de experiencia en Desarrollo de Software en tecnología JAVA.', 'XRM SERVICES', 2600000, 1),
    ('RS004', 'Coordinador de Mercadeo', 'Se necesita Coordinador de Mercadeo con estudios Tecnológicos graduado y experiencia mínima de un año.', 'INSERCOL', 1350000, 1),
    ('RS005', 'Profesor de Matemáticas', 'Se requiere Licenciado en Matemáticas o Ingeniero con mínimo 2 años de experiencia en docencia.', 'SENA', 1750000, 1),
    ('RS006', 'Mensajero', 'Se requiere mensajero con moto, con documentos al día y buenas relaciones personales.', 'SERVIENTREGA', 950000, 1),
    ('RS007', 'Cajero', 'Se requiere cajero para almacén de cadena con experiencia mínima de un año, debe disponer de tiempo por cambios de turnos.', 'ALMACENES ÉXITO', 850000, 1);


