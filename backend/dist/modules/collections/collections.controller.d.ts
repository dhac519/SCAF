import { CollectionsService } from './collections.service';
import { CreateCategoryDto, CreateSubcategoryDto, CreateItemDto } from './dto/collections.dto';
export declare class CollectionsController {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    createCategory(dto: CreateCategoryDto, req: any): Promise<{
        name: string;
        id: string;
        userId: string;
    }>;
    getCategories(req: any): Promise<({
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
    createSubcategory(dto: CreateSubcategoryDto, req: any): Promise<{
        name: string;
        id: string;
        userId: string;
        categoryId: string;
    }>;
    createItem(dto: CreateItemDto, req: any): Promise<{
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
    getItems(req: any): Promise<({
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
    removeItem(id: string, req: any): Promise<{
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
