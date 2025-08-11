using GrantTracker.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GrantTracker.Application.Interfaces.Repositories;

public interface IGrantRepository
{
    Task<IEnumerable<Grant?>> GetAllAsync();
    Task<Grant?> GetByIdAsync(Guid grantId);
    Task AddAsync(Grant grantId);
    Task UpdateAsync(Grant grantId);
    Task DeleteAsync(Guid grantId);
}
