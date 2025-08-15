namespace GrantTracker.Application.DTOs.Grants;

public class UpdateGrantDto
{
    public string Title { get; set; } = null!;           // Required
    public decimal Amount { get; set; }                 // Required
    public string FundingSource { get; set; } = null!;  // Required
    public DateTime SubmissionDate { get; set; }        // Required
    public DateTime DueDate { get; set; }               // Required
    public string? ContactEmail { get; set; }           // Optional
    public string Status { get; set; } = "Pending";     // Optional default value
}
