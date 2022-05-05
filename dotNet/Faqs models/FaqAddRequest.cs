using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Faqs
{
    public class FaqAddRequest
    {
        [Required]
        [StringLength(255, MinimumLength = 5)]
        public string Question { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 5)]
        public string Answer { get; set; }

        [Required(ErrorMessage = "Please choose a category")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Please choose a sort order")]
        public int SortOrder { get; set; }

        [Required]
        public int CreatedBy { get; set; }

        [Required]
        public int ModifiedBy { get; set; }

       
    }
}
