using Core.BanHang.Service;
using Core.Kho.Service;
using Core.MuaHang.Service;
using Core.QuanLyNhanSu.Service;
using Core.SanXuat.Service;
using DataContext.MyDbContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApi.Middleware;
using WebApi.Middleware.QueueRequest;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Thêm mô tả về security scheme
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,     // PHẢI LÀ Http
        Scheme = "bearer",                 // chữ thường, không hoa
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Nhập: <strong>Bearer {your-token-here}</strong>"
    });

    // Áp dụng cho toàn bộ API
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
static void InitDaoService(IServiceCollection services)
{
    #region QuanLyNhanSu
    services.AddScoped<IS_NhanSu,S_NhanSu>();

    #endregion

    #region QuanLyBanHang
    services.AddScoped<IS_KhachHang,S_KhachHang>();
    services.AddScoped<IS_DonHang,S_DonHang>();
    services.AddScoped<IS_HoaDonBan,S_HoaDonBan>();
    services.AddScoped<IS_PhuongThucThanhToan, S_PhuongThucThanhToan>();
    services.AddScoped<IS_DonViTinh,S_DonViTinh>();
    #endregion

    #region QuanLyKho
    services.AddScoped<IS_SanPham,S_SanPham>();
    services.AddScoped<IS_VatTu,S_VatTu>();
    services.AddScoped<IS_Kho,S_Kho>();
    services.AddScoped<IS_PhieuNhap,S_PhieuNhap>();
    services.AddScoped<IS_PhieuXuat,S_PhieuXuat>();
    #endregion

    #region QuanLySanXuat
    services.AddScoped<IS_LenhSanXuat, S_LenhSanXuat>();
    #endregion

    #region QuanLyMuaHang
    services.AddScoped<IS_NhaCungCap,S_NhaCungCap>();
    services.AddScoped<IS_DonMua,S_DonMua>();
    #endregion


    #region Common
    services.AddSingleton<IRequestQueue, RequestQueue>();
    #endregion
}


InitDaoService(builder.Services);

builder.Services.AddDbContext<MyContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("StrDb")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
