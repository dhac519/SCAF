import { NetOpsPlatform, NetOpsCategory } from '@prisma/client';
export declare class CreateNetOpsCommandDto {
    title: string;
    command: string;
    description?: string;
    platform: NetOpsPlatform;
    category: NetOpsCategory;
    isGenerator?: boolean;
    variables?: any;
}
