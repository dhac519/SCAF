import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class WikiService {
  constructor(private readonly prisma: PrismaService) {}

  // FOLDERS
  async createFolder(userId: string, createFolderDto: CreateFolderDto) {
    return this.prisma.wikiFolder.create({
      data: { ...createFolderDto, userId },
    });
  }

  async findAllFolders(userId: string) {
    return this.prisma.wikiFolder.findMany({
      where: { userId },
      include: { topics: { include: { notes: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async removeFolder(userId: string, id: string) {
    const folder = await this.prisma.wikiFolder.findFirst({ where: { id, userId } });
    if (!folder) throw new NotFoundException('Carpeta no encontrada');
    return this.prisma.wikiFolder.delete({ where: { id } });
  }

  // TOPICS
  async createTopic(userId: string, createTopicDto: CreateTopicDto) {
    return this.prisma.wikiTopic.create({
      data: { ...createTopicDto, userId },
    });
  }

  async removeTopic(userId: string, id: string) {
    const topic = await this.prisma.wikiTopic.findFirst({ where: { id, userId } });
    if (!topic) throw new NotFoundException('Tema no encontrado');
    return this.prisma.wikiTopic.delete({ where: { id } });
  }

  // NOTES
  async createNote(userId: string, createNoteDto: CreateNoteDto) {
    return this.prisma.wikiNote.create({
      data: { ...createNoteDto, userId },
    });
  }

  async updateNote(userId: string, id: string, updateNoteDto: any) {
    const note = await this.prisma.wikiNote.findFirst({ where: { id, userId } });
    if (!note) throw new NotFoundException('Nota no encontrada');
    return this.prisma.wikiNote.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async findOneNote(userId: string, id: string) {
    const note = await this.prisma.wikiNote.findFirst({
      where: { id, userId },
      include: { topic: { include: { folder: true } } },
    });
    if (!note) throw new NotFoundException('Nota no encontrada');
    return note;
  }

  async removeNote(userId: string, id: string) {
    const note = await this.prisma.wikiNote.findFirst({ where: { id, userId } });
    if (!note) throw new NotFoundException('Nota no encontrada');
    return this.prisma.wikiNote.delete({ where: { id } });
  }
}
