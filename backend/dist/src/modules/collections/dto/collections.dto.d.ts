export declare class CreateCategoryDto {
    name: string;
}
export declare class CreateSubcategoryDto {
    name: string;
    categoryId: string;
}
export declare class CreateItemDto {
    name: string;
    categoryId: string;
    subcategoryId?: string;
    year?: number;
    quality?: string;
    estimatedValue?: number;
    quantity?: number;
}
