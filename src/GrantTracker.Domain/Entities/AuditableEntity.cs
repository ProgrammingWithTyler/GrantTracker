using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GrantTracker.Domain.Entities;

public abstract class AuditableEntity
{
    public DateTime CreatedAt { get; set; }  // UTC, required
    public string? CreatedBy { get; set; }   // Optional, depends on your auth system

    public DateTime? UpdatedAt { get; set; } // Nullable, updated on modifications
    public string? UpdatedBy { get; set; }   // Optional
}
