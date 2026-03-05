using Core.Kho.Request;
using Core.Kho.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyKho
{
    [Route("api/QuanLyKho/[controller]")]
    [ApiController]
    public class PhieuXuatController : ControllerBase
    {
        private readonly IS_PhieuXuat _s_PhieuXuat;
        public PhieuXuatController(IS_PhieuXuat s_PhieuXuat)
        {
            _s_PhieuXuat = s_PhieuXuat;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_PhieuXuat.GetByPage(model, authHeader));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_PhieuXuat model, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuXuat.Create(model, auth));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuXuat.GetById(id, auth));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_PhieuXuat mode, int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuXuat.Update(mode, id, auth));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuXuat.Delete(id, auth));
        }

        [HttpPut("update/state")]
        public async Task<IActionResult> UpdateState(int id, int state, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_PhieuXuat.UpdateState(id, state, auth));
        }
    }
}
