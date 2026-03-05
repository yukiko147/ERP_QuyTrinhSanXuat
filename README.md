
# DoAnERP

Hệ thống ERP mô-đun hóa cho doanh nghiệp vừa và nhỏ.

## Chức năng chính
- Bán hàng: Quản lý đơn hàng, khách hàng, hóa đơn, báo cáo doanh số
- Mua hàng: Quản lý đơn mua, nhà cung cấp, công nợ, báo cáo
- Kho: Quản lý nhập xuất tồn, kiểm kê, cảnh báo tồn kho
- Kế toán: Phiếu thu/chi, sổ quỹ, báo cáo tài chính
- Nhân sự: Hồ sơ nhân viên, chấm công, tính lương
- Sản xuất: Lệnh sản xuất, định mức, tiến độ, báo cáo hiệu suất

## Công nghệ
- Front-end: ReactJS, Vite, TailwindCSS, Firebase/Supabase
- Back-end: ASP.NET Core 6/7, Entity Framework Core, JWT
- Database: SQL Server (script khởi tạo: SQLQuery1.sql)

## Triển khai

### Front-end
```bash
cd front-end
npm install
npm run dev
# http://localhost:5173
```

### Back-end
```bash
cd back-end/API_ERP_QuyTrinhSanXuat/WebApi
dotnet restore
dotnet run
# http://localhost:5000
```

### Database
- Chạy `SQLQuery1.sql` trên SQL Server trước khi khởi động back-end

## Cấu trúc thư mục
- `front-end/src/pages/`: Các trang chức năng
- `back-end/API_ERP_QuyTrinhSanXuat/Core.*`: Module nghiệp vụ
- `back-end/API_ERP_QuyTrinhSanXuat/WebApi/Controllers/`: API controllers
- `back-end/API_ERP_QuyTrinhSanXuat/DataContext/`: Kết nối, truy vấn DB

## Đóng góp
- Tuân thủ quy tắc Git, code review, tài liệu hóa rõ ràng
- Ưu tiên clean code, maintainability, teamwork
