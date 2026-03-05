using DataContext.Entity;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class PDFCreate
    {
        static string Safe(string? s) => string.IsNullOrWhiteSpace(s) ? "—" : s.Trim();
        public static byte[] Make(DonHang model)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            var vi = new CultureInfo("vi-VN");
            string Money(decimal v) => v.ToString("#,##0", vi) + " đ";

            // Tổng tiền: tính từ chi tiết đơn hàng (giữ đúng data bạn đang có)
            decimal grandTotal =(decimal)model.TongGTriDH;
            //if (model?.ChiTietDonHangs != null)
            //    grandTotal = model.ChiTietDonHangs.Sum(x => Convert.ToDecimal(x.ThanhTien));

            var bytes = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(24);
                    page.DefaultTextStyle(x => x.FontSize(10).FontFamily("Arial"));

                    // ===== HEADER =====
                    page.Header().Column(header =>
                    {
                        header.Item().Row(row =>
                        {
                            // Left: Company info
                            row.RelativeItem().Column(col =>
                            {
                                col.Item().Text("ABC COMPANY").Bold().FontSize(14);
                                col.Item().Text("Địa chỉ: ...............................................................")
                                    .FontSize(9).FontColor(Colors.Grey.Darken2);
                                col.Item().Text("Hotline: 0xxx xxx xxx   |   Email: contact@abc.com   |   MST: ..........")
                                    .FontSize(9).FontColor(Colors.Grey.Darken2);
                            });

                            // Right: Document title + meta
                            row.ConstantItem(200).AlignRight().Column(col =>
                            {
                                col.Item()
                                    .Text(model?.IsDonHang == true ? "ĐƠN HÀNG" : "BÁO GIÁ")
                                    .Bold().FontSize(16).FontColor(Colors.Blue.Darken3);

                                col.Item().Text($"Ngày: {DateTime.Now:dd/MM/yyyy HH:mm}").FontSize(10);
                                col.Item().Text($"Mã: {Safe(model?.MaDH ?? "—")}")
                                    .FontSize(10);
                            });
                        });

                        header.Item().PaddingTop(10).LineHorizontal(1).LineColor(Colors.Grey.Lighten2);
                    });

                    // ===== CONTENT =====
                    page.Content().PaddingTop(12).Column(col =>
                    {
                        col.Spacing(10);

                        // Customer block
                        col.Item().Border(1).BorderColor(Colors.Grey.Lighten2).Padding(12).Column(c =>
                        {
                            c.Item().Text("THÔNG TIN KHÁCH HÀNG").Bold().FontSize(11);

                            c.Item().PaddingTop(6).Row(r =>
                            {
                                r.RelativeItem().Text($"Tên khách hàng: {Safe(model?.KhachHang?.HoTenKh)}");
                                r.RelativeItem().Text($"SĐT: {Safe(model?.KhachHang?.Sdt)}");
                            });

                            c.Item().Row(r =>
                            {
                                r.RelativeItem().Text($"Email: {Safe(model?.KhachHang?.Email)}");
                                r.RelativeItem().Text($"Địa chỉ: {Safe(model?.KhachHang?.DiaChi)}");
                            });

                        });

                        col.Item().Text("CHI TIẾT HÀNG HÓA / DỊCH VỤ").Bold().FontSize(11);

                        // Table
                        col.Item().Table(table =>
                        {
                            table.ColumnsDefinition(cols =>
                            {
                                cols.ConstantColumn(32);   // STT
                                cols.RelativeColumn(4);    // Tên hàng
                                cols.RelativeColumn(2);    // SL
                                cols.RelativeColumn(2);    // Đơn giá
                                cols.RelativeColumn(2);    // Thuế
                                cols.RelativeColumn(2);    // Thành tiền
                            });

                            // Header style
                            IContainer Th(IContainer x) =>
                                x.Background(Colors.Grey.Lighten3)
                                 .Border(1).BorderColor(Colors.Grey.Lighten2)
                                 .PaddingVertical(6).PaddingHorizontal(6)
                                 .DefaultTextStyle(t => t.Bold().FontSize(9));

                            IContainer Td(IContainer x) =>
                                x.Border(1).BorderColor(Colors.Grey.Lighten2)
                                 .PaddingVertical(6).PaddingHorizontal(6)
                                 .DefaultTextStyle(t => t.FontSize(9));

                            table.Header(h =>
                            {
                                h.Cell().Element(Th).Text("STT");
                                h.Cell().Element(Th).Text("Hàng hóa");
                                h.Cell().Element(Th).AlignRight().Text("SL");
                                h.Cell().Element(Th).AlignRight().Text("Đơn giá");
                                h.Cell().Element(Th).AlignRight().Text("Thuế");
                                h.Cell().Element(Th).AlignRight().Text("Thành tiền");
                            });

                            var items = model.ChiTietDonHangs;
                            int stt = 0;

                            foreach (var item in items)
                            {
                                stt++;

                                var tenSp = Safe(item?.SanPham?.TenSP);
                                var qty = Convert.ToDecimal(item?.SoLuongHang ?? 0);
                                var donGia = Convert.ToDecimal(item?.DonGia ?? 0);
                                var thue = Convert.ToDecimal(item?.Thue ?? 0);
                                var thanhTien = Convert.ToDecimal(item?.ThanhTien ?? 0);

                                table.Cell().Element(Td).Text(stt.ToString());
                                table.Cell().Element(Td).Text(tenSp);

                                table.Cell().Element(Td).AlignRight().Text(qty.ToString("#,##0.##", vi));
                                table.Cell().Element(Td).AlignRight().Text(Money(donGia));
                                table.Cell().Element(Td).AlignRight().Text($"{thue:0.##}%");
                                table.Cell().Element(Td).AlignRight().Text(Money(thanhTien));
                            }

                            // Nếu không có dòng nào
                            if (stt == 0)
                            {
                                table.Cell().ColumnSpan(6).Element(Td).AlignCenter()
                                    .Text("Không có dữ liệu chi tiết.").FontColor(Colors.Grey.Darken2);
                            }
                        });

                        // Totals
                        col.Item().AlignRight().Width(280).Border(1).BorderColor(Colors.Grey.Lighten2).Padding(12).Column(t =>
                        {
                            t.Item().Row(r =>
                            {
                                r.RelativeItem().Text("TỔNG THANH TOÁN").Bold().FontSize(11);
                                r.ConstantItem(140).AlignRight().Text(Money(grandTotal)).Bold().FontSize(12).FontColor(Colors.Green.Darken2);

                            });

                            t.Item().PaddingTop(6).Text("* Chi tiết và điều khoản vui lòng xem trong file đính kèm / phản hồi email.")
                                .FontSize(8.5f).FontColor(Colors.Grey.Darken2);
                        });

                        // Signature area
                        col.Item().PaddingTop(8).Row(r =>
                        {
                            r.RelativeItem().Column(c =>
                            {
                                c.Item().Text("Ghi chú").Bold().FontSize(10);
                                c.Item().Text("• Báo giá có hiệu lực theo thỏa thuận.").FontSize(9).FontColor(Colors.Grey.Darken1);
                                c.Item().Text("• Thanh toán: chuyển khoản/tiền mặt.").FontSize(9).FontColor(Colors.Grey.Darken1);
                                c.Item().Text("• Xin cảm ơn Quý khách!").FontSize(9).FontColor(Colors.Grey.Darken1);
                            });

                            r.ConstantItem(220).AlignRight().Column(c =>
                            {
                                c.Item().Text("ĐẠI DIỆN CÔNG TY").Bold().AlignCenter();
                                c.Item().PaddingTop(40).Text("(Ký, ghi rõ họ tên)").FontSize(9).FontColor(Colors.Grey.Darken2).AlignCenter();
                            });
                        });
                    });

                    // ===== FOOTER =====
                    page.Footer().PaddingTop(10).Column(footer =>
                    {
                        footer.Item().LineHorizontal(1).LineColor(Colors.Grey.Lighten2);

                        footer.Item().PaddingTop(6).Row(r =>
                        {
                            r.RelativeItem()
                             .Text("Tài liệu được tạo tự động từ hệ thống.")
                             .FontSize(8).FontColor(Colors.Grey.Darken2);

                            r.ConstantItem(120).AlignRight().Text(x =>
                            {
                                x.Span("Trang ").FontSize(8).FontColor(Colors.Grey.Darken2);
                                x.CurrentPageNumber().FontSize(8).FontColor(Colors.Grey.Darken2);
                                x.Span(" / ").FontSize(8).FontColor(Colors.Grey.Darken2);
                                x.TotalPages().FontSize(8).FontColor(Colors.Grey.Darken2);
                            });
                        });
                    });
                });
            }).GeneratePdf();

            return bytes;


        }

    }
}
