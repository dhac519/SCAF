import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { ResolveBetDto } from './dto/resolve-bet.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Bets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva apuesta' })
  create(@Request() req: any, @Body() createBetDto: CreateBetDto) {
    return this.betsService.create(req.user.userId, createBetDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas avanzadas de apuestas' })
  getStats(@Request() req: any) {
    return this.betsService.getStats(req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las apuestas' })
  findAll(@Request() req: any) {
    return this.betsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una apuesta por ID' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.betsService.findOne(req.user.userId, id);
  }

  @Patch(':id/resolve')
  @ApiOperation({ summary: 'Resolver el estado de una apuesta (WON, LOST, VOID)' })
  resolve(@Request() req: any, @Param('id') id: string, @Body() resolveBetDto: ResolveBetDto) {
    return this.betsService.resolve(req.user.userId, id, resolveBetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una apuesta' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.betsService.remove(req.user.userId, id);
  }
}
