export declare class PriceService {
    private readonly logger;
    getCryptoPrices(ids: string[]): Promise<any>;
    getForexRates(base?: string): Promise<any>;
    getMarketTrends(): Promise<any>;
}
