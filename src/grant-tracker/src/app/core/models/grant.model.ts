export interface Grant {
  id: string;
  title: string;
  fundingSource: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Closed';
  submissionDate: Date;
  dueDate: Date;
  contactEmail: string;
}
