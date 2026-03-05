namespace WebApi.Middleware.QueueRequest
{
    public class RequestQueueMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IRequestQueue _requestQueue;

        public RequestQueueMiddleware(RequestDelegate next, IRequestQueue requestQueue)
        {
            _next = next;
            _requestQueue = requestQueue;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var info = new RequestInfo
            {
                Path = context.Request.Path,
                Method = context.Request.Method,
                Time = DateTime.UtcNow,
                QueryString = context.Request.QueryString.ToString(),
                UserAgent = context.Request.Headers["User-Agent"].ToString()
            };

            // Đưa request vào hàng đợi
            _requestQueue.Enqueue(info);

            // Cho request đi tiếp pipeline
            await _next(context);
        }
    }
}
