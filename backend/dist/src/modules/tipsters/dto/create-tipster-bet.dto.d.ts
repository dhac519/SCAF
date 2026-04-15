import { BetStatus } from '@prisma/client';
export declare class CreateTipsterBetDto {
    tipster: string;
    event: string;
    stake: number;
    odds: number;
    date?: string;
    status?: BetStatus;
}
