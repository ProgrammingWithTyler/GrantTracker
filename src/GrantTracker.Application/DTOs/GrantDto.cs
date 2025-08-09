namespace GrantTracker.Application.DTOs;

public class GrantDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public decimal Amount { get; set; }
    public string FundingSource { get; set; }
    public DateTime SubmissionDate { get; set; }
    public DateTime DueDate { get; set; }
    public string ContactEmail { get; set; }
    public string Status { get; set; } // Optional, if you want to expose status here
}
