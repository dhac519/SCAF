import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TipstersService } from './tipsters.service';
import { CreateTipsterBetDto } from './dto/create-tipster-bet.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { BetStatus } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('tipsters')
export class TipstersController {
  constructor(private readonly tipstersService: TipstersService) {}

  @Post()
  create(@Request() req: any, @Body() createTipsterBetDto: CreateTipsterBetDto) {
    return this.tipstersService.createBet(req.user.userId, createTipsterBetDto);
  }

  @Post('seed')
  async seedFakeData(@Request() req: any) {
    const tipsters = ['Sergi', 'S.Live', 'Personalizado'];
    const events = ['Alcaraz Gana', 'Más de 2.5 goles', 'Ambos marcan', 'Nadal Hándicap -1.5', 'Empate al descanso', 'Over 21.5 juegos', 'Djokovic Gana 3-0', 'Menos de 10.5 córners', 'Lakers a Ganar', 'Más de 200 pts NBA'];
    const statuses: BetStatus[] = ['WON', 'LOST', 'VOID', 'WON', 'WON']; // Más probabilidad de ganar para que la gráfica no sea un abismo
    
    // Create an array of 45 random dates spanning the last 5 months
    const dates: Date[] = [];
    const now = new Date();
    for (let i = 0; i < 45; i++) {
       const pastDate = new Date(now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 150); // Up to 150 days ago
       dates.push(pastDate);
    }
    // Sort chronologically to keep cumulative balance logic intact
    dates.sort((a, b) => a.getTime() - b.getTime());

    for (const d of dates) {
        const t = tipsters[Math.floor(Math.random() * tipsters.length)];
        const ev = events[Math.floor(Math.random() * events.length)];
        const st = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Simular alta varianza: a veces Stakes bajos (1-3) y otras veces muy altos (4-10)
        let stake = 1.0;
        if (Math.random() > 0.75) {
            stake = parseFloat((Math.random() * 6 + 4.0).toFixed(1)); // 4.0 a 10.0 (Apuestas pesadas)
        } else {
            stake = parseFloat((Math.random() * 2 + 1.0).toFixed(1)); // 1.0 a 3.0 (Apuestas normales)
        }
        
        const odds = parseFloat((Math.random() * 2 + 1.2).toFixed(2)); // Entre 1.2 y 3.2

        await this.tipstersService.createBet(req.user.userId, {
            tipster: t,
            event: ev,
            stake: stake,
            odds: odds,
            status: st,
            date: d.toISOString(),
        });
    }
    
    return { message: '45 datos ficticios multicriterio creados con éxito' };
  }

  @Get()
  findAll(@Request() req: any) {
    return this.tipstersService.findAll(req.user.userId);
  }

  @Get('dashboard')
  getDashboard(@Request() req: any) {
    return this.tipstersService.getDashboard(req.user.userId);
  }

  @Get('ranking')
  getRanking(@Request() req: any) {
    return this.tipstersService.getRanking(req.user.userId);
  }

  @Get('bank')
  getBank(@Request() req: any) {
    return this.tipstersService.getOrCreateBank(req.user.userId);
  }
  
  @Patch('bank')
  updateBank(@Request() req: any, @Body() updateBankDto: { currentBank?: number, unitValue?: number }) {
    return this.tipstersService.updateBank(req.user.userId, updateBankDto);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() updateData: any) {
    return this.tipstersService.updateBet(req.user.userId, id, updateData);
  }

  @Patch(':id/status')
  updateStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: BetStatus) {
    return this.tipstersService.updateBetStatus(req.user.userId, id, status);
  }

  @Delete(':id')
  delete(@Request() req: any, @Param('id') id: string) {
    return this.tipstersService.deleteBet(req.user.userId, id);
  }
}
