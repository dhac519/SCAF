import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NetopsService } from './netops.service';
import { CreateNetOpsCommandDto } from './dto/create-netops-command.dto';
import { UpdateNetOpsCommandDto } from './dto/update-netops-command.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('netops')
@UseGuards(JwtAuthGuard)
export class NetopsController {
  constructor(private readonly netopsService: NetopsService) {}

  @Post()
  create(
    @Req() req: any,
    @Body() createNetOpsCommandDto: CreateNetOpsCommandDto,
  ) {
    return this.netopsService.create(req.user.userId, createNetOpsCommandDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.netopsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.netopsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateNetOpsCommandDto: UpdateNetOpsCommandDto,
  ) {
    return this.netopsService.update(
      id,
      req.user.userId,
      updateNetOpsCommandDto,
    );
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.netopsService.remove(id, req.user.userId);
  }
}
