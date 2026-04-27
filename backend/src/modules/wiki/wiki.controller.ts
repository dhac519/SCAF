import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { WikiService } from './wiki.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wiki')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService) {}

  // FOLDERS
  @Post('folders')
  @ApiOperation({ summary: 'Crear una carpeta de wiki' })
  createFolder(@Request() req: any, @Body() createFolderDto: CreateFolderDto) {
    return this.wikiService.createFolder(req.user.userId, createFolderDto);
  }

  @Get('folders')
  @ApiOperation({ summary: 'Obtener todas las carpetas con sus temas y notas' })
  findAllFolders(@Request() req: any) {
    return this.wikiService.findAllFolders(req.user.userId);
  }

  @Delete('folders/:id')
  @ApiOperation({ summary: 'Eliminar una carpeta' })
  removeFolder(@Request() req: any, @Param('id') id: string) {
    return this.wikiService.removeFolder(req.user.userId, id);
  }

  // TOPICS
  @Post('topics')
  @ApiOperation({ summary: 'Crear un tema dentro de una carpeta' })
  createTopic(@Request() req: any, @Body() createTopicDto: CreateTopicDto) {
    return this.wikiService.createTopic(req.user.userId, createTopicDto);
  }

  @Delete('topics/:id')
  @ApiOperation({ summary: 'Eliminar un tema' })
  removeTopic(@Request() req: any, @Param('id') id: string) {
    return this.wikiService.removeTopic(req.user.userId, id);
  }

  // NOTES
  @Post('notes')
  @ApiOperation({ summary: 'Crear una nota dentro de un tema' })
  createNote(@Request() req: any, @Body() createNoteDto: CreateNoteDto) {
    return this.wikiService.createNote(req.user.userId, createNoteDto);
  }

  @Get('notes/:id')
  @ApiOperation({ summary: 'Obtener el contenido de una nota' })
  findOneNote(@Request() req: any, @Param('id') id: string) {
    return this.wikiService.findOneNote(req.user.userId, id);
  }

  @Patch('notes/:id')
  @ApiOperation({ summary: 'Actualizar una nota' })
  updateNote(@Request() req: any, @Param('id') id: string, @Body() updateNoteDto: any) {
    return this.wikiService.updateNote(req.user.userId, id, updateNoteDto);
  }

  @Delete('notes/:id')
  @ApiOperation({ summary: 'Eliminar una nota' })
  removeNote(@Request() req: any, @Param('id') id: string) {
    return this.wikiService.removeNote(req.user.userId, id);
  }
}
