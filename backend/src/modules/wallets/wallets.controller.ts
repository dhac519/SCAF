import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wallets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva billetera/cuenta' })
  create(@Request() req: any, @Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(req.user.userId, createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las billeteras del usuario' })
  findAll(@Request() req: any) {
    return this.walletsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una billetera por ID' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.walletsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una billetera' })
  update(@Request() req: any, @Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(req.user.userId, id, updateWalletDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una billetera' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.walletsService.remove(req.user.userId, id);
  }
}
