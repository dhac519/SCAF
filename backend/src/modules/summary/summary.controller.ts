import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Summary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('global')
  @ApiOperation({ summary: 'Obtener resumen global del usuario' })
  getGlobalSummary(@Request() req: any) {
    return this.summaryService.getGlobalSummary(req.user.userId);
  }
}
