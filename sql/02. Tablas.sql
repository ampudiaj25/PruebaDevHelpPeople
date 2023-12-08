-- 2. creacion tablas

USE [BolsaEmpleoDB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create Table TiposDocumento (
id 		Int PRIMARY KEY IDENTITY(1,1),
nombre 	Varchar(50)
);

Create Table Ciudadanos (
id 					Int PRIMARY KEY IDENTITY(1,1),
tipoDocumentoId 	Int,
cedula 				Varchar(50),
nombres 			Varchar(150),
apellidos 			Varchar(150),
fechaNacimiento 	Date,
profesion 			Varchar(200),
aspiracionSalarial 	Decimal(18,2),
correo 				Varchar(100),
FOREIGN KEY (tipoDocumentoId) REFERENCES TiposDocumento(id)
);

Create Table Vacantes(
id 			Int PRIMARY KEY IDENTITY(1,1),
codigo 		Varchar(50),
cargo 		Varchar(100),
descripcion Varchar(MAX),
empresa 	Varchar(100),
salario 	Decimal(18,2),
estado 		Bit
);

Create Table Postulaciones(
id 				Int PRIMARY KEY IDENTITY(1,1),
ciudadanoId 	Int,
vacanteId 		Int,
fecha 			DateTime,
FOREIGN KEY (ciudadanoId) REFERENCES Ciudadanos(id),
FOREIGN KEY (vacanteId) REFERENCES Vacantes(id),
CONSTRAINT UQ_Ciudadano_Unico UNIQUE (ciudadanoId)
);
