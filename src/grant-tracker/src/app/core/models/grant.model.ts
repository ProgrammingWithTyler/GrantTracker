export interface Grant {
  id: string;
  title: string;
  fundingSource: string;
  amount: number;
  status: 'Draft' | 'Submitted' | 'Pending' | 'Approved' | 'Rejected' | 'Closed';
  submissionDate?: Date;
  dueDate: Date;
  contactEmail: string;
}
