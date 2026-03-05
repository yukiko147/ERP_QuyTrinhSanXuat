using Core.Kho.Request;
using Core.Kho.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyKho
{
    [Route("api/QuanLyKho/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly IS_SanPham _s_SanPham;
        public SanPhamController(IS_SanPham s_SanPham)
        {
            _s_SanPham= s_SanPham;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_SanPham.GetByPage(model, authHeader));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody]MReq_SanPham model, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_SanPham.Create(model, auth));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_SanPham.GetById(id, auth));  
        }
    }
}
