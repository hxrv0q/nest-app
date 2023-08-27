import { Injectable } from '@nestjs/common';
import { ReportType } from './types';
import { data } from './data';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  public getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  public getReportById(type: ReportType, id: string) {
    return this.getAllReports(type).find((report) => report.id === id);
  }

  public createReport(
    type: ReportType,
    body: { amount: number; source: string },
  ) {
    const newReport = {
      id: uuid(),
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  public updateReportById(
    type: ReportType,
    id: string,
    body: { amount: number; source: string },
  ) {
    const reportToUpdate = this.getReportById(type, id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === id);

    data.report[reportIndex] = { ...data.report[reportIndex], ...body };
  }

  public deleteReportById(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }
}
