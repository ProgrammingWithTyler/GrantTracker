namespace GrantTracker.Infrastructure.Persistence;

using GrantTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.Reflection;

public class GrantDbContextFactory : IDesignTimeDbContextFactory<GrantDbContext>
{
    public GrantDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<GrantDbContext>();

        // Build configuration including user secrets
        // This will look for secrets in both Infrastructure and any referenced projects
        var configuration = new ConfigurationBuilder()
            .AddUserSecrets<GrantDbContext>()
            .AddUserSecrets(Assembly.GetExecutingAssembly(), optional: true)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException(
                "Connection string 'DefaultConnection' not found. Make sure to set it using: " +
                "dotnet user-secrets set \"ConnectionStrings:DefaultConnection\" \"your-connection-string\" " +
                "in either the API or Infrastructure project");
        }

        optionsBuilder.UseSqlServer(connectionString);

        return new GrantDbContext(optionsBuilder.Options);
    }
}