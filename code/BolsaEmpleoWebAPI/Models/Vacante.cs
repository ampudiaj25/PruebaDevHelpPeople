using System;
using System.Collections.Generic;

namespace BolsaEmpleoWebAPI.Models;

public partial class Vacante
{
    public int Id { get; set; }

    public string Codigo { get; set; } = null!;

    public string Cargo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public string Empresa { get; set; } = null!;

    public decimal Salario { get; set; }

    public bool Estado { get; set; }

    public virtual ICollection<Postulacione> Postulaciones { get; set; } = new List<Postulacione>();
}
