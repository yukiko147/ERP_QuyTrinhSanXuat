using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.ExceptionResponse
{
    public class ExceptionCode
    {
        public readonly static int Succes = 200;
        public readonly static int BadRequest = 400;
        public readonly static int Unauthorized = 401;
        public readonly static int Forbidden = 403;
        public readonly static int NotFound = 404;
        public readonly static int SeverError = 500;
    }
}
