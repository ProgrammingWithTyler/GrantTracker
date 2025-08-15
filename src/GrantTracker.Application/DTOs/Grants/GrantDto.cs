namespace GrantTracker.Application.DTOs.Grants;

public class GrantDto
{
    public Guid Id { get; init; } // Unique identifier for the grant
    public string Title { get; set; } = null!; // Grant title, required
    public decimal Amount { get; set; } // Grant amount, required
    public string FundingSource { get; set; } = null!; // Source of funding, required
    public DateTime SubmissionDate { get; set; } // Date the grant was submitted, required
    public DateTime DueDate { get; set; } // Grant application deadline, required
    public string? ContactEmail { get; set; } // Optional contact email
    public string Status { get; set; } = null!; // Current status of the grant (e.g., Pending, Approved)
}