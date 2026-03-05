using Core.BanHang.Request;
using Core.BanHang.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyBanHang
{
    [Route("api/QuanLyBanHang/[controller]")]
    [ApiController]
    public class HoaDonBanController : ControllerBase
    {
        private readonly IS_HoaDonBan _s_HoaDonBan;
        public HoaDonBanController(IS_HoaDonBan s_HoaDonBan)
        {
            _s_HoaDonBan = s_HoaDonBan;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_HoaDonBan.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_HoaDonBan.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_HoaDon model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_HoaDonBan.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_HoaDon model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_HoaDonBan.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_HoaDonBan.Delete(id, authHeader));
        }

        [HttpGet("LayHoaDon")]
        public async Task<IActionResult> GetHoaDonByDonHangId(string donHangId, [FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_HoaDonBan.GetHoaDonByMaHD(donHangId,auth));
        }

        [HttpPut("state/{id}/{state}")]
        public async Task<IActionResult> UpdateState(int id,int state, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_HoaDonBan.UpdateState(id, state, auth));
        }

        [HttpGet("email/{id}")]
        public async Task<IActionResult> SendEmail(int id,string email, [FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_HoaDonBan.GuiEmail(email,id,auth));
        }
    }
}
