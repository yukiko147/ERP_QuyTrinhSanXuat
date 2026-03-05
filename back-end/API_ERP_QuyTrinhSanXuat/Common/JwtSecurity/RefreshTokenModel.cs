using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.JwtSecurity
{
    public class RefreshTokenModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }          
        public string Token { get; set; }           
        public string JwtId { get; set; }           
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }     
        public bool IsUsed { get; set; }            
        public bool IsRevoked { get; set; }
        public string? ReplacedByToken { get; set; } 
    }
}
