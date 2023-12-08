using System;
using System.Collections.Generic;

namespace BolsaEmpleoWebAPI.Models;

public partial class Ciudadano
{
    public int Id { get; set; }

    public int TipoDocumentoId { get; set; }

    public string Cedula { get; set; } = null!;

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public DateOnly FechaNacimiento { get; set; }

    public string Profesion { get; set; } = null!;

    public decimal AspiracionSalarial { get; set; }

    public string Correo { get; set; } = null!;

    public virtual Postulacione? Postulacione { get; set; }

    public virtual TiposDocumento TipoDocumento { get; set; } = null!;
}
