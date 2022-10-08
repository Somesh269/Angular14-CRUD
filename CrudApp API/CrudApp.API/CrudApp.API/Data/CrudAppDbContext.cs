using CrudApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApp.API.Data
{
    public class CrudAppDbContext : DbContext
    {
        public CrudAppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
