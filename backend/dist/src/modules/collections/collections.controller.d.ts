import { CollectionsService } from './collections.service';
import { CreateCategoryDto, CreateSubcategoryDto, CreateItemDto } from './dto/collections.dto';
export declare class CollectionsController {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    createCategory(dto: CreateCategoryDto, req: any): Promise<{
        id: string;
        name: string;
        userId: string;
    }>;
    getCategories(req: any): Promise<({
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
    createSubcategory(dto: CreateSubcategoryDto, req: any): Promise<{
        id: string;
        name: string;
        userId: string;
        categoryId: string;
    }>;
    createItem(dto: CreateItemDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        year: number | null;
        userId: string;
        categoryId: string;
        quality: string | null;
        quantity: number;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        subcategoryId: string | null;
    }>;
    getItems(req: any): Promise<({
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
        year: number | null;
        userId: string;
        categoryId: string;
        quality: string | null;
        quantity: number;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        subcategoryId: string | null;
    })[]>;
    removeItem(id: string, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        year: number | null;
        userId: string;
        categoryId: string;
        quality: string | null;
        quantity: number;
        estimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        subcategoryId: string | null;
    }>;
}
