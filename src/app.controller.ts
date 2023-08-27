import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { data } from './data';
import { ReportType, Report } from './types';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = this.convertStringToReportType(type);
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    return this.getAllReports(type).find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Param() type: string,
    @Body() body: { amount: number; source: string },
  ) {
    const { amount, source } = body;

    const reportType = this.convertStringToReportType(type);

    const newReport: Report = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);

    return newReport;
  }

  @Put(':id')
  updateReportById(
    @Param() type: string,
    @Param() id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportToUpdate = this.getReportById(type, id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === id);

    data.report[reportIndex] = { ...data.report[reportIndex], ...body };
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param() id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
  }

  private convertStringToReportType(reportType: string) {
    switch (reportType) {
      case 'income':
        return ReportType.INCOME;
      case 'expense':
        return ReportType.EXPENSE;
    }
  }
}
