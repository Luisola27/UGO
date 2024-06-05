using Microsoft.EntityFrameworkCore;
using UGO.Models;

namespace DataConnection
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options) : base(options) { }

        public virtual DbSet<Nino> Nino { get; set; }

        public virtual DbSet<User> User { get; set; }
    }
}
