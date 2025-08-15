using AutoMapper;
using GrantTracker.Application.DTOs.Grants;
using GrantTracker.Application.Interfaces.Repositories;
using GrantTracker.Application.Interfaces.Services;
using Microsoft.Extensions.Logging;

namespace GrantTracker.Application.Services;

public class GrantService : IGrantService
{
    private readonly IGrantRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<GrantService> _logger;

    public GrantService(
        IGrantRepository repository,
        IMapper mapper,
        ILogger<GrantService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<GrantDto>> GetAllAsync()
    {
        var grants = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<GrantDto>>(grants);
    }

    public async Task<GrantDto?> GetByIdAsync(Guid id)
    {
        var grant = await _repository.GetByIdAsync(id);
        if (grant == null)
        {
            _logger.LogWarning("Grant with Id {Id} not found", id);
            return null;
        }
        return _mapper.Map<GrantDto>(grant);
    }

    public async Task<Guid> CreateAsync(CreateGrantDto dto)
    {
        // Basic business validation
        if (dto.Amount <= 0 || dto.Amount > 10_000_000)
            throw new ArgumentException("Grant amount must be between $1 and $10M");

        if (dto.DueDate <= DateTime.UtcNow)
            throw new ArgumentException("Grant due date must be in the future");

        var entity = _mapper.Map<Domain.Entities.Grant>(dto);

        await _repository.AddAsync(entity);
        _logger.LogInformation("Grant {Title} created with Id {Id}", entity.Title, entity.Id);

        return entity.Id;
    }

    public async Task<bool> UpdateAsync(Guid id, UpdateGrantDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
        {
            _logger.LogWarning("Attempted to update non-existent grant {Id}", id);
            return false;
        }

        // Business validation
        if (dto.Amount <= 0 || dto.Amount > 10_000_000)
            throw new ArgumentException("Grant amount must be between $1 and $10M");

        if (dto.DueDate <= DateTime.UtcNow)
            throw new ArgumentException("Grant due date must be in the future");

        _mapper.Map(dto, existing); // AutoMapper maps DTO to existing entity
        await _repository.UpdateAsync(existing);

        _logger.LogInformation("Grant {Id} updated", id);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null)
        {
            _logger.LogWarning("Attempted to delete non-existent grant {Id}", id);
            return false;
        }

        await _repository.DeleteAsync(existing.Id);
        _logger.LogInformation("Grant {Id} deleted", id);
        return true;
    }
}
