-- 2. creacion tablas

USE [BolsaEmpleoDB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create Table TiposDocumento (
id 		Int PRIMARY KEY IDENTITY(1,1),
nombre 	Varchar(50) not null
);

Create Table Ciudadanos (
id 					Int PRIMARY KEY IDENTITY(1,1),
tipoDocumentoId 	Int not null,
cedula 				Varchar(50) not null,
nombres 			Varchar(150) not null,
apellidos 			Varchar(150) not null,
fechaNacimiento 	Date not null,
profesion 			Varchar(200) not null,
aspiracionSalarial 	Decimal(18,2) not null,
correo 				Varchar(100) not null,
FOREIGN KEY (tipoDocumentoId) REFERENCES TiposDocumento(id)
);

Create Table Vacantes(
id 			Int PRIMARY KEY IDENTITY(1,1),
codigo 		Varchar(50) not null,
cargo 		Varchar(100) not null,
descripcion Varchar(MAX) not null,
empresa 	Varchar(100) not null,
salario 	Decimal(18,2) not null,
estado 		Bit not null
);

Create Table Postulaciones(
id 				Int PRIMARY KEY IDENTITY(1,1),
ciudadanoId 	Int not null,
vacanteId 		Int not null,
fecha 			DateTime not null,
FOREIGN KEY (ciudadanoId) REFERENCES Ciudadanos(id),
FOREIGN KEY (vacanteId) REFERENCES Vacantes(id),
CONSTRAINT UQ_Ciudadano_Unico UNIQUE (ciudadanoId)
);
