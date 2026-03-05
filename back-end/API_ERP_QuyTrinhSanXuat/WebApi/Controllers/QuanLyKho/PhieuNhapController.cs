using Core.Kho.Request;
using Core.Kho.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyKho
{
    [Route("api/QuanLyKho/[controller]")]
    [ApiController]
    public class PhieuNhapController : ControllerBase
    {
        private readonly IS_PhieuNhap _s_PhieuNhap;
        public PhieuNhapController(IS_PhieuNhap s_PhieuNhap)
        {
            _s_PhieuNhap = s_PhieuNhap;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_PhieuNhap.GetByPage(model, authHeader));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_PhieuNhap model, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuNhap.Create(model, auth));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuNhap.GetById(id, auth));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_PhieuNhap mode, int id, [FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_PhieuNhap.Update(mode, id, auth));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuNhap.Delete(id, auth));
        }

        [HttpPut("update/state")]
        public async Task<IActionResult> UpdateState(int id,int state, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuNhap.UpdateState(id, state, auth));   
        }
    }
}
