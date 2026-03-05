using Core.BanHang.Request;
using Core.BanHang.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyBanHang
{
    [Route("api/QuanLyBanHang/[controller]")]
    [ApiController]
    public class PhuongThucThanhToanController : ControllerBase
    {
        private readonly IS_PhuongThucThanhToan _s_PhuongThucThanhToan;
        public PhuongThucThanhToanController(IS_PhuongThucThanhToan phuongThucThanhToan)
        {
            _s_PhuongThucThanhToan = phuongThucThanhToan;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_PhuongThucThanhToan.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_PhuongThucThanhToan.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_PhuongThucThanhToan model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_PhuongThucThanhToan.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_PhuongThucThanhToan model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_PhuongThucThanhToan.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_PhuongThucThanhToan.Delete(id, authHeader));
        }
    }
}
