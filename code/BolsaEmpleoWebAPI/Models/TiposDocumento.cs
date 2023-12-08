using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BolsaEmpleoWebAPI.Models;

public partial class TiposDocumento
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Ciudadano> Ciudadanos { get; set; } = new List<Ciudadano>();
}
