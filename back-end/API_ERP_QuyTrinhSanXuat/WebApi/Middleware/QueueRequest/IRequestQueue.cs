using System.Collections.Concurrent;

namespace WebApi.Middleware.QueueRequest
{
    public interface IRequestQueue
    {
        void Enqueue(RequestInfo info);         // thêm request vào hàng đợi
        bool TryDequeue(out RequestInfo info); // lấy 1 request ra xử lý
        IReadOnlyCollection<RequestInfo> GetAll(); // xem nhanh
    }

    public class RequestQueue : IRequestQueue
    {
        private readonly ConcurrentQueue<RequestInfo> _queue = new();

        public void Enqueue(RequestInfo info)
        {
            _queue.Enqueue(info);
        }

        public bool TryDequeue(out RequestInfo info)
        {
            return _queue.TryDequeue(out info);
        }

        public IReadOnlyCollection<RequestInfo> GetAll()
        {
            return _queue.ToArray();
        }
    }
}
