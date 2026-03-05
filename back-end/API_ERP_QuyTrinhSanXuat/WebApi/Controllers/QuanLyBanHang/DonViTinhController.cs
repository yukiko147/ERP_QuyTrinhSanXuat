using Core.BanHang.Request;
using Core.BanHang.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyBanHang
{
    [Route("api/QuanLyBanHang/[controller]")]
    [ApiController]
    public class DonViTinhController : ControllerBase
    {
        private readonly IS_DonViTinh _s_DonViTinh;
        public DonViTinhController(IS_DonViTinh s_DonViTinh)
        {
            _s_DonViTinh = s_DonViTinh;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonViTinh.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_DonViTinh.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_DVTinh model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonViTinh.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_DVTinh model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonViTinh.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonViTinh.Delete(id, authHeader));
        }
    }
}
