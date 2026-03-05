using Core.BanHang.Request;
using Core.BanHang.Service;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyBanHang
{
    [Route("api/QuanLyBanHang/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly IS_KhachHang _s_KhachHang;
        public KhachHangController(IS_KhachHang s_KhachHang)
        {
            _s_KhachHang = s_KhachHang;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_KhachHang.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_KhachHang.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_KhachHang model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_KhachHang.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_KhachHang model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_KhachHang.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_KhachHang.Delete(id, authHeader));
        }
    }
}
