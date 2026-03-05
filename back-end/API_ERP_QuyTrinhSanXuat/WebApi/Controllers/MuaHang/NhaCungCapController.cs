using Core.BanHang.Request;
using Core.BanHang.Service;
using Core.MuaHang.Request;
using Core.MuaHang.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace WebApi.Controllers.MuaHang
{
    [Route("api/QuanLyMuaHang/[controller]")]
    [ApiController]
    public class NhaCungCapController : ControllerBase
    {
        private readonly IS_NhaCungCap _s_NhaCungCap;
        public NhaCungCapController(IS_NhaCungCap s_NhaCungCap)
        {
            _s_NhaCungCap = s_NhaCungCap;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Core.MuaHang.Request.MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhaCungCap.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_NhaCungCap.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_NhaCungCap model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhaCungCap.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_NhaCungCap model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhaCungCap.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhaCungCap.Delete(id, authHeader));
        }
    }
}
