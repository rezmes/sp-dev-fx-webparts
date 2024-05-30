export interface IInvoiceHeaderProps {
  invoiceNumber: number;
  customerName: string;
  customerAddress: string;
  companyAddress: string;
  companyName: string;
  amountdue: number;
  issueDate: Date;
  dueDate: Date;
  onIssueDateChange: (date: Date) => void;
  onDueDateChange: (date: Date) => void;
}
