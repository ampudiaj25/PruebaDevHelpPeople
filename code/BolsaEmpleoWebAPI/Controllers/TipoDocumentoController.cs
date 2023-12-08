using BolsaEmpleoWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BolsaEmpleoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoController : ControllerBase
    {
        private readonly BolsaEmpleoDbContext _context;
        public TipoDocumentoController(BolsaEmpleoDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TiposDocumento>>> GetTiposDocumento() 
        {
            return Ok(await _context.TiposDocumentos.ToListAsync());
        }
    }
}
