namespace GrantTracker.Application.DTOs.Grants;

public class CreateGrantDto
{
    public string Title { get; set; } = null!;      // Grant title, required
    public decimal Amount { get; set; }             // Grant amount, must be positive
    public string FundingSource { get; set; } = null!; // Source of funding, required
    public DateTime SubmissionDate { get; set; }    // Date grant was submitted
    public DateTime DueDate { get; set; }           // Application deadline, must be after SubmissionDate
    public string? ContactEmail { get; set; }       // Optional contact email
    public string Status { get; set; } = "Pending"; // Optional default status; e.g., Pending, Approved
}
