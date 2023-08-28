import { Injectable } from '@nestjs/common';
import { ReportType } from './types';
import { data } from './data';
import * as uuid from 'uuid';

type Report = {
  amount: number;
  source: string;
};

type UpdateReport = { amount?: number } & Report;

@Injectable()
export class AppService {
  public getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  public getReport(type: ReportType, id: string) {
    return this.getAllReports(type).find((report) => report.id === id);
  }

  public createReport(type: ReportType, body: Report) {
    const newReport = {
      id: uuid.v4(),
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  public updateReport(type: ReportType, id: string, body: UpdateReport) {
    const reportToUpdate = this.getReport(type, id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === id);

    data.report[reportIndex] = { ...data.report[reportIndex], ...body };
  }

  public deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }
}
