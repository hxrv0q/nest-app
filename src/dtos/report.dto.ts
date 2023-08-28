import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ReportType } from 'src/types';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto extends CreateReportDto {
  @IsOptional()
  amount: number;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
