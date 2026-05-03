import { PrismaService } from '../../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreateNoteDto } from './dto/create-note.dto';
export declare class WikiService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createFolder(userId: string, createFolderDto: CreateFolderDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAllFolders(userId: string): Promise<({
        topics: ({
            notes: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                userId: string;
                content: string;
                topicId: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            folderId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    removeFolder(userId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    createTopic(userId: string, createTopicDto: CreateTopicDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string;
    }>;
    removeTopic(userId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string;
    }>;
    createNote(userId: string, createNoteDto: CreateNoteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
    updateNote(userId: string, id: string, updateNoteDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
    findOneNote(userId: string, id: string): Promise<{
        topic: {
            folder: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            folderId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
    removeNote(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
}
