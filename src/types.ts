export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export type Report = {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportType;
};

export type Data = {
  report: Report[];
};
