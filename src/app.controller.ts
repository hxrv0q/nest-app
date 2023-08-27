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
import { ReportType, Report } from './types';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = this.convertStringToReportType(type);
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = this.convertStringToReportType(type);
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType = this.convertStringToReportType(type);
    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReportById(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType = this.convertStringToReportType(type);
    return this.appService.updateReportById(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param('id') id: string) {
    return this.appService.deleteReportById(id);
  }

  private convertStringToReportType(reportType: string) {
    switch (reportType) {
      case 'income':
        return ReportType.INCOME;
      case 'expense':
        return ReportType.EXPENSE;
      default:
        return ReportType.INCOME; 
    }
  }
}
