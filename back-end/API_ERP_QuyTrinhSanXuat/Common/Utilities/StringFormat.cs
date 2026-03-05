using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Common.Utilities
{
    public static class StringFormat
    {
        public static string GenerateDateSku(string name)
        {

            var normalized = name.Normalize(NormalizationForm.FormD);
            var builder = new StringBuilder();

            foreach (var ch in normalized)
            {
                var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(ch);
                if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                {
                    builder.Append(ch);
                }
            }

            string clean = builder.ToString()
                .Normalize(NormalizationForm.FormC)
                .ToUpper()
                .Trim();

            var words = clean.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            string prefix = string.Concat(words.Select(w => w[0]));

            long ticks = DateTime.UtcNow.Ticks;
            int id = (int)(ticks % 2600);
            int group = id / 100; 
            if (group > 25) group = 25;

            char code = (char)('A' + group);

            string last2 = (id % 100).ToString("D2");

     
            int rand = RandomNumberGenerator.GetInt32(0, 1000); 
            string randPart = rand.ToString("D3");

  
            string result = prefix + code + last2 + randPart;

            return result;

        }

        public static string CatChu(string name) {
            string initials = string.Concat(
    name.Split(' ', StringSplitOptions.RemoveEmptyEntries)
        .Select(w => char.ToUpper(w[0]))
);
            return initials;
        }
    }
}
