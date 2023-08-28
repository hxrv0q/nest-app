import { Injectable } from '@nestjs/common';
import { ReportService } from 'src/report/report.service';
import { ReportType } from 'src/types';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  public caculateSummary() {
    const totalExpense = this.reportService.calculateTotal(ReportType.EXPENSE);
    const totalIncome = this.reportService.calculateTotal(ReportType.INCOME);

    const netIncome = totalIncome - totalExpense;

    return { totalIncome, totalExpense, netIncome };
  }
}
