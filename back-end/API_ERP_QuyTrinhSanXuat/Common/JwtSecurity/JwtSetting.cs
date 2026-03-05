using Common.ExceptionResponse;
using DataContext.MyDbQuery;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Tokens.Experimental;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Common.Utilities;
namespace Common.JwtSecurity
{
    public class JwtSetting<T>
    {
        private readonly static string SecretKey = "sdC\"-7\\X.tK's5j+h_W<f5.XD:j5K*&c";

        public static string TaoToken(int id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(SecretKey);

            var claims = new[]
            {
                new Claim("Id",id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString())
            };

            var tokendes = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = "",
                Audience = "",
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokendes);

            return tokenHandler.WriteToken(token);
        }

        public static async Task<ApiResponse.ApiDataResponse<T>> GiaiToken(string tokenStr,bool checkChucVu,int checkPhongban,string strConn)
        {

            if(tokenStr==null||tokenStr==""||string.IsNullOrEmpty(tokenStr))
            {
                return new ApiResponse.ApiDataResponse<T>("Bạn chưa đăng nhập !!!",ExceptionCode.Unauthorized);
            }



            try
            {

                if(!tokenStr.StartsWith("Bearer"))
                {
                    return new ApiResponse.ApiDataResponse<T>("Token không hợp lệ !!!", ExceptionCode.Unauthorized);
                }

                int id = 0;
                int chucvu = 0;
                int phongban = 0;
                var tokenHandel = new JwtSecurityTokenHandler();
                var parameters = new TokenValidationParameters
                {
                    ValidateIssuer =false,
                    ValidateAudience = false,
                    ValidateLifetime = false, // kiểm tra exp
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "",
                    ValidAudience = "",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey)),

                    ClockSkew = TimeSpan.Zero
                };
                var result = tokenHandel.ValidateToken(tokenStr.Substring("Bearer ".Length).Trim(), parameters, out SecurityToken validatedToken);

                id =int.Parse(result.FindFirst("Id").Value.ToString());



                SqlParameter[] parms = new[]
                {
                    new SqlParameter("@id",id)
                };
                string sql = "Select ChucVu,PhongBan from NhanSu where Id = @id";

                DataTable datatable = await MyQuery.GetData(sql,strConn,CommandType.Text,parms );

                DataRow row= datatable.Rows[0];
                chucvu = int.Parse(row["ChucVu"].ToString());
                phongban = int.Parse(row["PhongBan"].ToString());

                if (phongban!=checkPhongban&& phongban!=PhongBanCode.Admin)
                {
                    return new ApiResponse.ApiDataResponse<T>(ExceptionMesseger.Forbidden, ExceptionCode.Forbidden);
                }


                if (checkChucVu == true && chucvu == 0)
                {
                    return new ApiResponse.ApiDataResponse<T>(ExceptionMesseger.Forbidden, ExceptionCode.Forbidden);
                }


                return new ApiResponse.ApiDataResponse<T>();
            }
            catch (SecurityTokenExpiredException) {
                return new ApiResponse.ApiDataResponse<T>(ExceptionMesseger.HetPhien, ExceptionCode.Unauthorized);
            }catch(SecurityTokenInvalidSignatureException)
            {
                return new ApiResponse.ApiDataResponse<T>(ExceptionMesseger.TokenLoi, ExceptionCode.Unauthorized);
            }catch(Exception ex)
            {
                return new ApiResponse.ApiDataResponse<T>("Lỗi hệ thống :"+ex.Message,ExceptionCode.SeverError);
            }
        }
    }
}
