using GrantTracker.Application.DTOs;
using GrantTracker.Application.DTOs.Grants;

namespace GrantTracker.Application.Interfaces.Services;

public interface IGrantService
{
    Task<IEnumerable<GrantDto>> GetAllAsync();
    Task<GrantDto?> GetByIdAsync(Guid id);
    Task<Guid> CreateAsync(CreateGrantDto dto);
    Task<bool> UpdateAsync(Guid id, UpdateGrantDto dto);
    Task<bool> DeleteAsync(Guid id);
}
