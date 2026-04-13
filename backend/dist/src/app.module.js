"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const prisma_module_1 = require("./prisma/prisma.module");
const wallets_module_1 = require("./modules/wallets/wallets.module");
const categories_module_1 = require("./modules/categories/categories.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const investments_module_1 = require("./modules/investments/investments.module");
const bets_module_1 = require("./modules/bets/bets.module");
const collections_module_1 = require("./modules/collections/collections.module");
const admin_module_1 = require("./modules/admin/admin.module");
const summary_module_1 = require("./modules/summary/summary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule, prisma_module_1.PrismaModule, wallets_module_1.WalletsModule, categories_module_1.CategoriesModule, transactions_module_1.TransactionsModule, investments_module_1.InvestmentsModule, bets_module_1.BetsModule, collections_module_1.CollectionsModule, admin_module_1.AdminModule, summary_module_1.SummaryModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map