namespace GrantTracker.Application.MappingProfiles;

using AutoMapper;
using GrantTracker.Domain.Entities;
using GrantTracker.Application.DTOs.Grants;

public class GrantMappingProfile : Profile
{
    public GrantMappingProfile()
    {
        // Global DateOnly <-> DateTime conversions
        CreateMap<DateOnly, DateTime>()
            .ConvertUsing(dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue));
            
        CreateMap<DateTime, DateOnly>()
            .ConvertUsing(dateTime => DateOnly.FromDateTime(dateTime));

        // Entity to DTO mappings
        CreateMap<Grant, GrantDto>();
        
        // DTO to Entity mappings  
        CreateMap<CreateGrantDto, Grant>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
            
        CreateMap<UpdateGrantDto, Grant>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());
    }
}
