import { Injectable } from '@nestjs/common';
import { ReportType } from './types';
import { data } from './data';
import * as uuid from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

type CreateReport = Pick<ReportResponseDto, 'source' | 'amount'>;

type UpdateReport = Partial<CreateReport>;

@Injectable()
export class AppService {
  public getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map(this.convertReportToReportResponseDto);
  }

  public getReport(type: ReportType, id: string) {
    const report = this.getAllReports(type).find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDto(report);
  }

  public createReport(
    type: ReportType,
    report: CreateReport,
  ): ReportResponseDto {
    const newReport = {
      id: uuid.v4(),
      ...report,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  public updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ReportResponseDto {
    const reportToUpdate = this.getReport(type, id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === id);
    data.report[reportIndex] = { ...data.report[reportIndex], ...body };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  public deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }

  private convertReportToReportResponseDto(
    report: Partial<ReportResponseDto>,
  ): ReportResponseDto {
    return new ReportResponseDto(report);
  }
}
