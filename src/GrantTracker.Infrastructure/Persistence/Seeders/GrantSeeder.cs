namespace GrantTracker.Infrastructure.Persistence.Seeders;

using GrantTracker.Domain.Entities;
using GrantTracker.Domain.Enum;
using Microsoft.EntityFrameworkCore;

public static class GrantSeeder
{
    public static async Task SeedAsync(GrantDbContext context)
    {
        if (await context.Grants.AnyAsync())
            return; // Don't reseed if data exists

        var random = new Random();
        var fundingSources = new[]
        {
            "National Science Foundation",
            "Bill & Melinda Gates Foundation",
            "Department of Education",
            "Ford Foundation",
            "Rockefeller Foundation",
            "Google.org",
            "Microsoft Philanthropies"
        };

        var statuses = Enum.GetValues<GrantStatus>();
        var grants = new List<Grant>();

        for (int i = 1; i <= 100; i++)
        {
            grants.Add(new Grant
            {
                Id = Guid.NewGuid(),
                Title = $"Grant #{i} - {fundingSources[random.Next(fundingSources.Length)]}",
                FundingSource = fundingSources[random.Next(fundingSources.Length)],
                Amount = random.Next(5000, 200000),
                Status = statuses[random.Next(statuses.Length)],
                SubmissionDate = DateOnly.FromDateTime(DateTime.Now.AddDays(-random.Next(1, 365))),
                DueDate = DateOnly.FromDateTime(DateTime.Now.AddDays(random.Next(30, 365))),
                ContactEmail = $"contact{i}@example.org"
            });
        }

        await context.Grants.AddRangeAsync(grants);
        await context.SaveChangesAsync();
    }
}
