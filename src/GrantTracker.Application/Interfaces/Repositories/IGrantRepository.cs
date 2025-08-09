using GrantTracker.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GrantTracker.Application.Interfaces.Repositories;

public interface IGrantRepository
{
    Task<Grant> GetByIdAsync(int id);
    Task<IEnumerable<Grant>> GetAllAsync();
    Task AddAsync(Grant grant);
    Task UpdateAsync(Grant grant);
    Task DeleteAsync(int id);
}
