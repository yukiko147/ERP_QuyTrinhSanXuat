using Core.MuaHang.Request;
using Core.MuaHang.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.MuaHang
{
    [Route("api/QuanLyMuaHang/[controller]")]
    [ApiController]
    public class DonNhapController : ControllerBase
    {
        private readonly IS_DonMua _s_DonMua;
        public DonNhapController(IS_DonMua s_DonMua)
        {
            _s_DonMua = s_DonMua;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Core.MuaHang.Request.MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonMua.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_DonMua.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_DonMua model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonMua.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_DonMua model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonMua.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonMua.Delete(id, authHeader));
        }

        [HttpPut("update/state")]
        public async Task<IActionResult> UpdateState(int id,int state, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonMua.UpdateState(id, state, authHeader));
        }
    }
}
