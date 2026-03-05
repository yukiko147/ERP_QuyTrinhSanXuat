using DataContext.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class EmailSTMP
    {
        private static readonly int stmpPort = 587;
        private static readonly string stmpHost = "smtp.gmail.com";
        private static readonly string stpmUserEmail = "2200009972@nttu.edu.vn";
        private static readonly string stmpPass = "takw nfkg mytm pdqz";
        private static readonly string From = "Công ty ABC";

        //2200009972@nttu.edu.vn"
        //takw nfkg mytm pdqz


        public static bool SendEmail(string email, DonHang model)
        {
            try
            {
                email = (email ?? "").Trim();
                if (string.IsNullOrWhiteSpace(email))
                    throw new ArgumentException("Email người nhận không hợp lệ.");

                // chặn ký tự xuống dòng tránh header injection
                if (email.Contains("\r") || email.Contains("\n"))
                    throw new ArgumentException("Email người nhận không hợp lệ.");

                var displayName = (From ?? "Công ty ABC").Trim()
                    .Replace("\r", "")
                    .Replace("\n", "");

                using var mail = new MailMessage();
                mail.To.Add(new MailAddress(email));
                mail.From = new MailAddress(stpmUserEmail, displayName);

                // Plain text
                mail.IsBodyHtml = false;
                mail.BodyEncoding = Encoding.UTF8;
                mail.SubjectEncoding = Encoding.UTF8;

                var customerName = model?.KhachHang?.HoTenKh ?? "Quý khách";
                var ma = model?.MaDH ?? "—";
                var nowText = DateTime.Now.ToString("dd/MM/yyyy HH:mm");
                var docType = (model?.IsDonHang == true) ? "Đơn hàng" : "Báo giá";

                // Subject chuẩn doanh nghiệp (không !!!)
                mail.Subject = $"{docType} {ma} – {displayName}";

                // Body text chuẩn doanh nghiệp
                mail.Body =
$@"Kính gửi Quý khách {customerName},

Cảm ơn Quý khách đã quan tâm và lựa chọn sản phẩm/dịch vụ của {displayName}.
Chúng tôi xin gửi Quý khách thông tin {docType} cho đơn hàng (file PDF đính kèm). 
Trong trường hợp Quý khách cần điều chỉnh nội dung báo giá hoặc có bất kỳ thắc mắc nào, vui lòng phản hồi email này hoặc liên hệ với chúng tôi theo thông tin bên dưới.

Trân trọng,

Bộ phận Kinh doanh
{displayName}
Hotline: 0xxx xxx xxx
Email: {stpmUserEmail}";


                // Attach PDF (giữ logic cũ)
                var pdfBytes = PDFCreate.Make(model);
                using var pdfStream = new MemoryStream(pdfBytes);
                using var att = new Attachment(pdfStream, "donhang.pdf", MediaTypeNames.Application.Pdf);
                mail.Attachments.Add(att);

                using var smtpClient = new SmtpClient(stmpHost, stmpPort)
                {
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(stpmUserEmail, stmpPass)
                };

                smtpClient.Send(mail);
                return true;
            }
            catch
            {
                throw;
            }
        }

        public static bool SendEmail(string email,HoaDon model)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.To.Add(email);
                    mail.From = new MailAddress(stmpHost, From);

                    mail.IsBodyHtml = true;
                    mail.Subject = "Bảng báo giá cho khách hàng !!!";
                    mail.Body = "Công ty ABC chân trọng bao giá !!!";

                    using (SmtpClient stmpClient = new SmtpClient())
                    {
                        stmpClient.EnableSsl = true;
                        stmpClient.Port = stmpPort;
                        stmpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                        stmpClient.Credentials = new NetworkCredential(stmpHost, stmpPass);
                    }

                }
                return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
