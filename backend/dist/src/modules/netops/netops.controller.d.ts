import { NetopsService } from './netops.service';
import { CreateNetOpsCommandDto } from './dto/create-netops-command.dto';
import { UpdateNetOpsCommandDto } from './dto/update-netops-command.dto';
export declare class NetopsController {
    private readonly netopsService;
    constructor(netopsService: NetopsService);
    create(req: any, createNetOpsCommandDto: CreateNetOpsCommandDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        userId: string;
        category: import(".prisma/client").$Enums.NetOpsCategory;
        platform: import(".prisma/client").$Enums.NetOpsPlatform;
        command: string;
        isGenerator: boolean;
        variables: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        userId: string;
        category: import(".prisma/client").$Enums.NetOpsCategory;
        platform: import(".prisma/client").$Enums.NetOpsPlatform;
        command: string;
        isGenerator: boolean;
        variables: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        userId: string;
        category: import(".prisma/client").$Enums.NetOpsCategory;
        platform: import(".prisma/client").$Enums.NetOpsPlatform;
        command: string;
        isGenerator: boolean;
        variables: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(req: any, id: string, updateNetOpsCommandDto: UpdateNetOpsCommandDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        userId: string;
        category: import(".prisma/client").$Enums.NetOpsCategory;
        platform: import(".prisma/client").$Enums.NetOpsPlatform;
        command: string;
        isGenerator: boolean;
        variables: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        userId: string;
        category: import(".prisma/client").$Enums.NetOpsCategory;
        platform: import(".prisma/client").$Enums.NetOpsPlatform;
        command: string;
        isGenerator: boolean;
        variables: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
