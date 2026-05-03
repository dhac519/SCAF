import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PriceService {
  private readonly logger = new Logger(PriceService.name);

  // CoinGecko API for Crypto
  async getCryptoPrices(ids: string[]): Promise<any> {
    if (ids.length === 0) return {};
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd`,
      );
      return await response.json();
    } catch (error) {
      this.logger.error('Error fetching crypto prices', error);
      return {};
    }
  }

  // ExchangeRate-API for higher frequency Forex
  async getForexRates(base: string = 'USD'): Promise<any> {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      const data = await response.json();
      return {
        base: data.base_code,
        rates: data.rates,
      };
    } catch (error) {
      this.logger.error('Error fetching forex rates', error);
      return { rates: {} };
    }
  }

  // MARKET TRENDS (Top 10 Crypto + Major FX)
  async getMarketTrends(): Promise<any> {
    try {
      const [cryptoRes, forexRes] = await Promise.all([
        fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h',
        ),
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
    } catch (error) {
      this.logger.error('Error fetching market trends', error);
      return { crypto: [], forex: { rates: {} } };
    }
  }
}
