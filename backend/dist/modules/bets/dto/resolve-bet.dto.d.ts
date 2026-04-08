import { BetStatus } from '@prisma/client';
export declare class ResolveBetDto {
    status: BetStatus;
    cashoutAmount?: number;
}
