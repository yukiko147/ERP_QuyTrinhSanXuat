using Core.QuanLyNhanSu.Reponsitory;
using Core.QuanLyNhanSu.Request;
using Core.QuanLyNhanSu.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyNhanSu
{
    [Route("api/QuanLyNhanSu/[controller]")]
    [ApiController]
    public class NhanSuController : ControllerBase
    {
        private readonly IS_NhanSu _s_NhanSu;
        public NhanSuController(IS_NhanSu s_NhanSu)
        {
            _s_NhanSu = s_NhanSu;   
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhanSu.GetByPage(model, authHeader));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name ="Authorization")]string? authHeade)
        {
            return Ok(await _s_NhanSu.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody]MReq_NhanSu model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhanSu.Create(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody]MReq_NhanSu model,int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhanSu.Update(model,id,authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_NhanSu.Delete(id,authHeader));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]MReq_Login model)
        {
            return Ok(await _s_NhanSu.Login(model));
        }


        [HttpPost("khoitao")]
        public async Task<IActionResult> KhoiTao([FromBody] MReq_NhanSu model)
        {
            return Ok(await _s_NhanSu.KhoiTao(model));
        }

    }
}
