import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, CreateSubcategoryDto, CreateItemDto } from './dto/collections.dto';
export declare class CollectionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory(dto: CreateCategoryDto, userId: string): Promise<{
        name: string;
        id: string;
        userId: string;
    }>;
    getCategories(userId: string): Promise<({
        subcategories: {
            name: string;
            id: string;
            userId: string;
            categoryId: string;
        }[];
    } & {
        name: string;
        id: string;
        userId: string;
    })[]>;
    createSubcategory(dto: CreateSubcategoryDto, userId: string): Promise<{
        name: string;
        id: string;
        userId: string;
        categoryId: string;
    }>;
    createItem(dto: CreateItemDto, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        year: number | null;
        userId: string;
        categoryId: string;
        subcategoryId: string | null;
        quality: string | null;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        quantity: number;
    }>;
    getItems(userId: string): Promise<({
        category: {
            name: string;
            id: string;
            userId: string;
        };
        subcategory: {
            name: string;
            id: string;
            userId: string;
            categoryId: string;
        } | null;
    } & {
        name: string;
        id: string;
        createdAt: Date;
        year: number | null;
        userId: string;
        categoryId: string;
        subcategoryId: string | null;
        quality: string | null;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        quantity: number;
    })[]>;
    removeItem(id: string, userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        year: number | null;
        userId: string;
        categoryId: string;
        subcategoryId: string | null;
        quality: string | null;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        quantity: number;
    }>;
}
