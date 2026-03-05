namespace WebApi.Helper
{
    public class HttpUtillties
    {
        public static string HttpGetToken(HttpContext httpContext)
        {
            string tokenStr = httpContext.Request.Headers["Authorization"].ToString();
            return tokenStr;
        }
    }
}
