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
import { ReportType } from './types';
import { AppService } from './app.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType = this.convertStringToReportType(type);
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType = this.convertStringToReportType(type);
    return this.appService.getReport(reportType, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: CreateReportDto,
  ): ReportResponseDto {
    const reportType = this.convertStringToReportType(type);
    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    const reportType = this.convertStringToReportType(type);
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }

  private convertStringToReportType(reportType: string) {
    return ReportType[reportType.toUpperCase() as keyof typeof ReportType];
  }
}
