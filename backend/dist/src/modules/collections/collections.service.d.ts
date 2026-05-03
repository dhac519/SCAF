import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, CreateSubcategoryDto, CreateItemDto } from './dto/collections.dto';
export declare class CollectionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory(dto: CreateCategoryDto, userId: string): Promise<{
        id: string;
        name: string;
        userId: string;
    }>;
    getCategories(userId: string): Promise<({
        subcategories: {
            id: string;
            name: string;
            userId: string;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        userId: string;
    })[]>;
    createSubcategory(dto: CreateSubcategoryDto, userId: string): Promise<{
        id: string;
        name: string;
        userId: string;
        categoryId: string;
    }>;
    createItem(dto: CreateItemDto, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        categoryId: string;
        subcategoryId: string | null;
        year: number | null;
        quality: string | null;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        quantity: number;
    }>;
    getItems(userId: string): Promise<({
        category: {
            id: string;
            name: string;
            userId: string;
        };
        subcategory: {
            id: string;
            name: string;
            userId: string;
            categoryId: string;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        categoryId: string;
        subcategoryId: string | null;
        year: number | null;
        quality: string | null;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        quantity: number;
    })[]>;
    removeItem(id: string, userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        categoryId: string;
        subcategoryId: string | null;
        year: number | null;
        quality: string | null;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        quantity: number;
    }>;
}
