import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(req: any, createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    findAll(req: any): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    update(req: any, id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        userId: string;
    }>;
}
