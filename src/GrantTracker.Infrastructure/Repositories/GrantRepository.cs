using GrantTracker.Application.Interfaces.Repositories;
using GrantTracker.Domain.Entities;
using GrantTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GrantTracker.Infrastructure.Repositories;

public class GrantRepository : IGrantRepository
{
    private readonly ILogger<GrantRepository> _logger;
    private readonly GrantDbContext _context;

    public GrantRepository(ILogger<GrantRepository> logger, GrantDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<Grant?> GetByIdAsync(Guid grantId)
    {
        return await _context.Grants.FindAsync(grantId);
    }

    public async Task<IEnumerable<Grant>> GetAllAsync()
    {
        return await _context.Grants.ToListAsync();
    }

    public async Task AddAsync(Grant grant)
    {
        await _context.Grants.AddAsync(grant);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Grant grant)
    {
        _context.Grants.Update(grant);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid grantId)
    {
        var grant = await _context.Grants.FindAsync(grantId);
        if (grant == null)
        {
            _logger.LogWarning("Cannot delete grant because it was not found");
            return;
        }
    
        _context.Grants.Remove(grant);  // Add this line
        await _context.SaveChangesAsync();  // Add this line
    }
}