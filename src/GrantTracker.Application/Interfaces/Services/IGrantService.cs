using GrantTracker.Application.DTOs;

namespace GrantTracker.Application.Interfaces.Services
{
    public interface IGrantService
    {
        Task<IEnumerable<GrantDto>> GetAllGrantsAsync();
        Task<GrantDto> GetGrantByIdAsync(int id);
        Task AddGrantAsync(GrantDto grantDto);
        Task UpdateGrantAsync(GrantDto grantDto);
        Task DeleteGrantAsync(int id);
    }
}
