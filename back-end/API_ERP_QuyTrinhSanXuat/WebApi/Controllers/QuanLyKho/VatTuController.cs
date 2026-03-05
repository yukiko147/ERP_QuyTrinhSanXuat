using Core.Kho.Request;
using Core.Kho.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyKho
{
    [Route("api/QuanLyKho/[controller]")]
    [ApiController]
    public class VatTuController : ControllerBase
    {
        private readonly IS_VatTu _s_VatTu;
        public VatTuController(IS_VatTu s_VatTu)
        {
            _s_VatTu = s_VatTu;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_VatTu.GetByPage(model, authHeader));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_VatTu model, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_VatTu.Create(model, auth));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_VatTu.GetById(id, auth));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_VatTu.Delete(id, auth));
        }
    }
}
