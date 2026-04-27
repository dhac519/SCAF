import { WikiService } from './wiki.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { CreateNoteDto } from './dto/create-note.dto';
export declare class WikiController {
    private readonly wikiService;
    constructor(wikiService: WikiService);
    createFolder(req: any, createFolderDto: CreateFolderDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAllFolders(req: any): Promise<({
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
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            folderId: string;
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    removeFolder(req: any, id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    createTopic(req: any, createTopicDto: CreateTopicDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string;
    }>;
    removeTopic(req: any, id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        folderId: string;
    }>;
    createNote(req: any, createNoteDto: CreateNoteDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
    findOneNote(req: any, id: string): Promise<{
        topic: {
            folder: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
            };
        } & {
            name: string;
            id: string;
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
    updateNote(req: any, id: string, updateNoteDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
    removeNote(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
        content: string;
        topicId: string;
    }>;
}
