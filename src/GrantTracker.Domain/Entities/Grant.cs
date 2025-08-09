using GrantTracker.Domain.Enum;

namespace GrantTracker.Domain.Entities;

public class Grant
{
    public Guid Id { get; set; } 

    public string Title { get; set; } = string.Empty;

    public string FundingSource { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public GrantStatus Status { get; set; }

    public DateOnly SubmissionDate { get; set; }

    public DateOnly DueDate { get; set; }

    public string ContactEmail { get; set; } = string.Empty;
}