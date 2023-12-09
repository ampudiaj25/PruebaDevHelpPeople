using BolsaEmpleoWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BolsaEmpleoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacantesController : ControllerBase
    {
        private readonly BolsaEmpleoDbContext _context;

        public VacantesController(BolsaEmpleoDbContext context)
        {
            _context = context;
        }

        // GET: api/Vacantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vacante>>> GetVacantes()
        {
            return await _context.Vacantes.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> PostPostulacion(Postulacione postulacione)
        {
            postulacione.Fecha = DateTime.Now;      
            _context.Postulaciones.Add(postulacione);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
