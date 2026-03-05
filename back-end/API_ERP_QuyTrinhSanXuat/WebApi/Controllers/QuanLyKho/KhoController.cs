using Core.Kho.Request;
using Core.Kho.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyKho
{
    [Route("api/QuanLyKho/[controller]")]
    [ApiController]
    public class KhoController : ControllerBase
    {
        private readonly IS_Kho _s_Kho;
        public KhoController(IS_Kho s_Kho)
        {
            _s_Kho = s_Kho;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_Kho.GetByPage(model, authHeader));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_Kho model, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_Kho.Create(model, auth));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_Kho.GetById(id, auth));
        }

        [HttpGet("khosanpham")]
        public async Task<IActionResult> GetKhoSanPham([FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_Kho.GetAllKhoSanPham(auth)); 
        }

        [HttpGet("khovattu")]
        public async Task<IActionResult> GetKhoVatTu([FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_Kho.GetAllKhoVatTu(auth));   
        }
    }
}
