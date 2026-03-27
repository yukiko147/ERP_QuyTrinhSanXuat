
# DoAnERP

Hệ thống ERP mô-đun hóa cho doanh nghiệp vừa và nhỏ.

## Chức năng chính
- Đăng nhập, đăng xuất  
- Quản lý tài khoản, phân quyền  
- Quản lý đơn hàng bán và xuất kho  
- Quản lý đơn hàng mua và nhập kho  
- Quản lý sản xuất và số lượng tồn trong kho

## Công nghệ
- Front-end: ReactJS, Vite, TailwindCSS
- Back-end: ASP.NET Core 8, Entity Framework Core
- Database: SQL Server 

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
