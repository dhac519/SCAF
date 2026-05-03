import { PrismaService } from '../../prisma/prisma.service';
import { CreateNetOpsCommandDto } from './dto/create-netops-command.dto';
import { UpdateNetOpsCommandDto } from './dto/update-netops-command.dto';
export declare class NetopsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createNetOpsCommandDto: CreateNetOpsCommandDto): Promise<{
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
    findAll(userId: string): Promise<{
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
    findOne(id: string, userId: string): Promise<{
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
    update(id: string, userId: string, updateNetOpsCommandDto: UpdateNetOpsCommandDto): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
