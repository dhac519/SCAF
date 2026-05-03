"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PriceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
let PriceService = PriceService_1 = class PriceService {
    logger = new common_1.Logger(PriceService_1.name);
    async getCryptoPrices(ids) {
        if (ids.length === 0)
            return {};
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`);
            return await response.json();
        }
        catch (error) {
            this.logger.error('Error fetching crypto prices', error);
            return {};
        }
    }
    async getForexRates(base = 'USD') {
        try {
            const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
            const data = await response.json();
            return {
                base: data.base_code,
                rates: data.rates,
            };
        }
        catch (error) {
            this.logger.error('Error fetching forex rates', error);
            return { rates: {} };
        }
    }
    async getMarketTrends() {
        try {
            const [cryptoRes, forexRes] = await Promise.all([
                fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'),
                fetch('https://open.er-api.com/v6/latest/USD'),
            ]);
            const forexData = await forexRes.json();
            const cryptoData = await cryptoRes.json();
            return {
                crypto: Array.isArray(cryptoData) ? cryptoData : [],
                forex: {
                    base: forexData.base_code || 'USD',
                    rates: forexData.rates || {},
                },
            };
        }
        catch (error) {
            this.logger.error('Error fetching market trends', error);
            return { crypto: [], forex: { rates: {} } };
        }
    }
};
exports.PriceService = PriceService;
exports.PriceService = PriceService = PriceService_1 = __decorate([
    (0, common_1.Injectable)()
], PriceService);
//# sourceMappingURL=price.service.js.map