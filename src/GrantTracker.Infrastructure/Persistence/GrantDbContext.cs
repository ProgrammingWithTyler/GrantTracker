namespace GrantTracker.Infrastructure.Persistence;

using GrantTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
public class GrantDbContext : DbContext
{
    public GrantDbContext(DbContextOptions<GrantDbContext> options)
        : base(options)
    {
    }

    public DbSet<Grant> Grants { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Grant>(entity =>
        {
            entity.Property(e => e.Title).HasMaxLength(200);
            entity.Property(e => e.FundingSource).HasMaxLength(200);
            entity.Property(e => e.ContactEmail).HasMaxLength(320);
            entity.Property(e => e.Amount).HasPrecision(18, 2);
        });
    }

    public override int SaveChanges()
    {
        UpdateAuditFields();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateAuditFields();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateAuditFields()
    {
        var entries = ChangeTracker
            .Entries<AuditableEntity>();

        foreach (var entry in entries)
        {
            var now = DateTime.UtcNow;
            // TODO: Replace with your current user context for CreatedBy/UpdatedBy
            string currentUser = "SYSTEM";

            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
                entry.Entity.CreatedBy = currentUser;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = now;
                entry.Entity.UpdatedBy = currentUser;
            }
        }
    }

}
