using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ExceptionResponse
{
    public class ExceptionMesseger
    {
        #region Success
        public static readonly string GetDataSucces = "Lấy dữ liệu thành công !!!";
        public static readonly string CreateDataSucces = "Tạo mới dữ liệu thành công !!!";
        public static readonly string LoginSucces = "Đăng nhập thành công !!!";
        public static readonly string EditSucces = "Chỉnh sửa dữ liệu thành công !!!";
        public static readonly string DeleteSucces = "Xóa dữ liệu thành công !!!";
        #endregion

        #region Error
        public static readonly string Forbidden = "Bạn không có quyền sử dụng !!!";
        public static readonly string Unauthorized = "Bạn chưa đăng nhập !!!";
        public static readonly string HetPhien = "Hết phiên đăng nhập !!!";
        public static readonly string TokenLoi = "Token khôn hợp lệ !!!";
        public static readonly string NotFound = "Không tìm thấy dữ liệu !!!";
        public static readonly string BadRequest = "Thao tác thất bại !!!";
        public static readonly string LoginFall = "Đăng nhập thất bại !!!";
        #endregion
    }
}
