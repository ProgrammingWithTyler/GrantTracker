using FluentValidation;
using GrantTracker.Application.DTOs.Grants;

namespace GrantTracker.API.Validators;

public class CreateGrantDtoValidator : AbstractValidator<CreateGrantDto>
{
    public CreateGrantDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .Length(5, 200).WithMessage("Title must be between 5 and 200 characters");
            
        RuleFor(x => x.Amount)
            .GreaterThan(0).WithMessage("Amount must be greater than 0")
            .LessThanOrEqualTo(10_000_000).WithMessage("Amount cannot exceed $10,000,000");
            
        RuleFor(x => x.FundingSource)
            .NotEmpty().WithMessage("Funding source is required")
            .MaximumLength(100).WithMessage("Funding source cannot exceed 100 characters");
            
        RuleFor(x => x.DueDate)
            .GreaterThan(DateTime.UtcNow).WithMessage("Due date must be in the future");
            
        RuleFor(x => x.DueDate)
            .GreaterThan(x => x.SubmissionDate)
            .WithMessage("Due date must be after submission date");
            
        RuleFor(x => x.ContactEmail)
            .EmailAddress().WithMessage("Invalid email format")
            .When(x => !string.IsNullOrEmpty(x.ContactEmail));
    }
}