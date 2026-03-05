using Core.BanHang.Request;
using Core.BanHang.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.QuanLyBanHang
{
    [Route("api/QuanLyBanHang/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        private readonly IS_DonHang _s_DonHang;
        public DonHangController(IS_DonHang s_DonHang)
        {
            _s_DonHang = s_DonHang;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MReq_Pagination model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonHang.GetByPage(model, authHeader));
        }

        [HttpGet("baogia")]
        public async Task<IActionResult> GetBaoGia([FromQuery] MReq_Pagination model, [FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_DonHang.GetBaoGia(model, auth));
        }

        [HttpGet("baogia/{id}")]
        public async Task<IActionResult> GetBaoGiaById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_DonHang.GetBaoGiaById(id, authHeade));
        }
 
 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, [FromHeader(Name = "Authorization")] string? authHeade)
        {
            return Ok(await _s_DonHang.GetById(id, authHeade));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] MReq_DonHang model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonHang.Create(model, authHeader));
        }

        [HttpPost("baogia/add")]
        public async Task<IActionResult> CreateBaoGia([FromBody] MReq_DonHang model, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonHang.CreateBaoGia(model, authHeader));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromBody] MReq_DonHang model, int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonHang.Update(model, id, authHeader));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id, [FromHeader(Name = "Authorization")] string? authHeader)
        {
            return Ok(await _s_DonHang.Delete(id, authHeader));
        }

        [HttpGet("chuyenbaogiathanhdonhang/{id}")]
        public async Task<IActionResult> ChuyenBaoGiaThanhDonHang(int id, [FromHeader(Name ="Authorization")] string? authHeader)
        {
            return Ok(await _s_DonHang.ChuyenBaoGiaThanhDonHang(id, authHeader));
        }


        [HttpPut("updateState/{id}/{state}")]
        public async Task<IActionResult> UpdateSatate(int id,int state, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_DonHang.UpdateState(id, state, auth));
        }

        [HttpGet("kiemtratonkho/{sanphamId}/{donhangId}")]
        public async Task<IActionResult> KiemTraTonKho(int sanphamId,int donhangId, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_DonHang.KiemTraTon(sanphamId, donhangId, auth));
        }

        [HttpPost("TaoLenhSanXuat")]
        public async Task<IActionResult> TaoLenhSX(MReq_SanXuat model, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_DonHang.TaoLenhSX(model, auth));
        }

        [HttpGet("taohoadon")]
        public async Task<IActionResult> TaoHoaDon(int donHangid,int createBy, [FromHeader(Name ="Authorization")] string? auth)
        {
            return Ok(await _s_DonHang.TaoHoaDon(donHangid, createBy, auth));   
        }

        [HttpGet("GuiEmail")]
        public async Task<IActionResult> GuiEmail(string email,int id, [FromHeader(Name ="Authorization")]string? auth)
        {
            return Ok(await _s_DonHang.GuiEmails(id, email, auth));
        }

        [HttpGet("thanhtoan")]
        public async Task<IActionResult> ThanhToan(int donHangid, int createBy, [FromHeader(Name = "Authorization")] string? auth)
        {
            return Ok(await _s_DonHang.TaoThanhToan(donHangid, createBy, auth));
        }
    }
}
