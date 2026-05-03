import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    update(userId: string, id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
}
