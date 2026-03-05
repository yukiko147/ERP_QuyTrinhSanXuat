
using Core.SanXuat.Request;
using Core.SanXuat.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLySanXuat
{
    [Route("api/QuanLySanXuat/[controller]")]
    [ApiController]
    public class LenhSanXuatController : ControllerBase
    {
        private readonly IS_LenhSanXuat _s_LenhSanXuat;
        public LenhSanXuatController(IS_LenhSanXuat s_LenhSanXuat)
        {
            _s_LenhSanXuat = s_LenhSanXuat;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_LenhSanXuat.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_LenhSanXuat.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_LenhSanXuat model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_LenhSanXuat.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_LenhSanXuat model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_LenhSanXuat.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_LenhSanXuat.Delete(id, authHeader));
        }

        [HttpGet("kiemtravattu/{lenhSanXuatId}/{vatTuId}")]
        public async Task<IActionResult> KiemTraVatTu(int lenhSanXuatId,int vatTuId, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_LenhSanXuat.KiemTraTon(vatTuId, lenhSanXuatId, auth));
        }

        [HttpPut("state/{id}/{state}")]
        public async Task<IActionResult> UpdateSate(int id, int state, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_LenhSanXuat.UpdateState(id, state, auth));
        }

        [HttpPost("bosung")]
        public async Task<IActionResult> BoSung([FromBody] MReq_PhieuNhapLenhSanXuat model, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_LenhSanXuat.BoSung(model, auth));
        }


    }
}
