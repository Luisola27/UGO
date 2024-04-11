using DataConnection.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataConnection
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options) : base(options) { }

        public virtual DbSet<Nino> Nino { get; set; }

    }
}
