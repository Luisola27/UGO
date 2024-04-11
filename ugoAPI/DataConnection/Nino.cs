using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DataConnection.Entities
{
    public class Nino
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? NinoId { get; set; }
        public string? Name { get; set; }
        public string? Identification { get; set; }
        public int? Age { get; set; }
        public int? Gender { get; set; }
        public string? Sponsor {  get; set; }
        public int? Gift { get; set; }
    }
}

