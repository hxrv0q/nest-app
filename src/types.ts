export enum ReportType {
  INCOME,
  EXPENSE,
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
