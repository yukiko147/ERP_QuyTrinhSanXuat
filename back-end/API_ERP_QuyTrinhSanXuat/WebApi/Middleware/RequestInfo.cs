namespace WebApi.Middleware
{
    public class RequestInfo
    {
        public string Path { get; set; }
        public string Method { get; set; }
        public DateTime Time { get; set; }
        public string? QueryString { get; set; }
        public string? UserAgent { get; set; }
    }
}
