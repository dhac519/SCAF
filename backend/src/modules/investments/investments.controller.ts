import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { CreateInvestmentTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Investments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva inversión' })
  create(@Request() req: any, @Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investmentsService.create(req.user.userId, createInvestmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las inversiones' })
  findAll(@Request() req: any) {
    return this.investmentsService.findAll(req.user.userId);
  }

  @Get('market-trends')
  @ApiOperation({ summary: 'Obtener tendencias del mercado (Cripto y Divisas)' })
  getMarketTrends() {
    return this.investmentsService.getMarketTrends();
  }

  // PLATFORMS
  @Post('platforms')
  @ApiOperation({ summary: 'Crear una plataforma de inversión' })
  createPlatform(@Request() req: any, @Body() createPlatformDto: CreatePlatformDto) {
    return this.investmentsService.createPlatform(req.user.userId, createPlatformDto);
  }

  @Get('platforms')
  @ApiOperation({ summary: 'Obtener todas las plataformas' })
  findAllPlatforms(@Request() req: any) {
    return this.investmentsService.findAllPlatforms(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una inversión por ID' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.investmentsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una inversión (ej. currentValue)' })
  update(@Request() req: any, @Param('id') id: string, @Body() updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentsService.update(req.user.userId, id, updateInvestmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una inversión' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.investmentsService.remove(req.user.userId, id);
  }

  // TRANSACTIONS
  @Post('transactions')
  @ApiOperation({ summary: 'Registrar una transacción de compra/venta' })
  addTransaction(@Request() req: any, @Body() dto: CreateInvestmentTransactionDto) {
    return this.investmentsService.addTransaction(req.user.userId, dto);
  }
}
