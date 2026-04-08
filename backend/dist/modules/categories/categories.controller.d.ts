import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(req: any, createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    update(req: any, id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
}
