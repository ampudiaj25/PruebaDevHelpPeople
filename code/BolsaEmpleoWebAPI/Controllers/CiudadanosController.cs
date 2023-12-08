using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BolsaEmpleoWebAPI.Models;

namespace BolsaEmpleoWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CiudadanosController : ControllerBase
    {
        private readonly BolsaEmpleoDbContext _context;

        public CiudadanosController(BolsaEmpleoDbContext context)
        {
            _context = context;
        }

        // GET: api/Ciudadano
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudadano>>> GetCiudadanos()
        {
            return await _context.Ciudadanos.ToListAsync();
        }

        // GET: api/Ciudadano
        [HttpGet("aspirantesPostulacion")]
        public async Task<ActionResult<IEnumerable<Ciudadano>>> GetAspirantesAPostulacion()
        {
            return await _context.Ciudadanos
                        .Where(ciudadano => !_context.Postulaciones.Any(postulacion => postulacion.CiudadanoId == ciudadano.Id))
                        .ToListAsync();
        }


        // PUT: api/Ciudadano/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutCiudadano(Ciudadano ciudadano)
        {
            bool result = await _context.Ciudadanos.AnyAsync(e => e.Id == ciudadano.Id);
            if (!result)
            {
                return BadRequest();
            }

            _context.Entry(ciudadano).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Ciudadano
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostCiudadano(Ciudadano ciudadano)
        {
            _context.Ciudadanos.Add(ciudadano);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Ciudadano/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCiudadano(int id)
        {
            var ciudadano = await _context.Ciudadanos.FindAsync(id);
            if (ciudadano == null)
            {
                return NotFound();
            }

            _context.Ciudadanos.Remove(ciudadano);
            await _context.SaveChangesAsync();

            return Ok();
        }

   
    }
}
