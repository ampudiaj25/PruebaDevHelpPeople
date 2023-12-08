using System;
using System.Collections.Generic;

namespace BolsaEmpleoWebAPI.Models;

public partial class Postulacione
{
    public int Id { get; set; }

    public int CiudadanoId { get; set; }

    public int VacanteId { get; set; }

    public DateTime Fecha { get; set; }

    public virtual Ciudadano Ciudadano { get; set; } = null!;

    public virtual Vacante Vacante { get; set; } = null!;
}
