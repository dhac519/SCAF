import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva transacción' })
  create(@Request() req: any, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.userId, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las transacciones del usuario' })
  findAll(@Request() req: any) {
    return this.transactionsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una transacción por ID' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.transactionsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una transacción' })
  update(@Request() req: any, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(req.user.userId, id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una transacción' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.transactionsService.remove(req.user.userId, id);
  }
}
