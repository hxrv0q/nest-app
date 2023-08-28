import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from '../types';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType = this.convertStringToReportType(type);
    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType = this.convertStringToReportType(type);
    return this.reportService.getReport(reportType, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: CreateReportDto,
  ): ReportResponseDto {
    const reportType = this.convertStringToReportType(type);
    return this.reportService.createReport(reportType, body);
  }

  @Put(':id')
  updateReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    const reportType = this.convertStringToReportType(type);
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }

  private convertStringToReportType(reportType: string) {
    return ReportType[reportType.toUpperCase() as keyof typeof ReportType];
  }
}
