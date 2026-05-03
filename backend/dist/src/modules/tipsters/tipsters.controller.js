"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipstersController = void 0;
const common_1 = require("@nestjs/common");
const tipsters_service_1 = require("./tipsters.service");
const create_tipster_bet_dto_1 = require("./dto/create-tipster-bet.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const client_1 = require("@prisma/client");
let TipstersController = class TipstersController {
    tipstersService;
    constructor(tipstersService) {
        this.tipstersService = tipstersService;
    }
    create(req, createTipsterBetDto) {
        return this.tipstersService.createBet(req.user.userId, createTipsterBetDto);
    }
    async seedFakeData(req) {
        const tipsters = ['Sergi', 'S.Live', 'Personalizado'];
        const events = [
            'Alcaraz Gana',
            'Más de 2.5 goles',
            'Ambos marcan',
            'Nadal Hándicap -1.5',
            'Empate al descanso',
            'Over 21.5 juegos',
            'Djokovic Gana 3-0',
            'Menos de 10.5 córners',
            'Lakers a Ganar',
            'Más de 200 pts NBA',
        ];
        const statuses = ['WON', 'LOST', 'VOID', 'WON', 'WON'];
        const dates = [];
        const now = new Date();
        for (let i = 0; i < 45; i++) {
            const pastDate = new Date(now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 150);
            dates.push(pastDate);
        }
        dates.sort((a, b) => a.getTime() - b.getTime());
        for (const d of dates) {
            const t = tipsters[Math.floor(Math.random() * tipsters.length)];
            const ev = events[Math.floor(Math.random() * events.length)];
            const st = statuses[Math.floor(Math.random() * statuses.length)];
            let stake = 1.0;
            if (Math.random() > 0.75) {
                stake = parseFloat((Math.random() * 6 + 4.0).toFixed(1));
            }
            else {
                stake = parseFloat((Math.random() * 2 + 1.0).toFixed(1));
            }
            const odds = parseFloat((Math.random() * 2 + 1.2).toFixed(2));
            await this.tipstersService.createBet(req.user.userId, {
                tipster: t,
                event: ev,
                stake: stake,
                odds: odds,
                status: st,
                date: d.toISOString(),
            });
        }
        return { message: '45 datos ficticios multicriterio creados con éxito' };
    }
    findAll(req) {
        return this.tipstersService.findAll(req.user.userId);
    }
    getDashboard(req) {
        return this.tipstersService.getDashboard(req.user.userId);
    }
    getRanking(req) {
        return this.tipstersService.getRanking(req.user.userId);
    }
    getBank(req) {
        return this.tipstersService.getOrCreateBank(req.user.userId);
    }
    updateBank(req, updateBankDto) {
        return this.tipstersService.updateBank(req.user.userId, updateBankDto);
    }
    update(req, id, updateData) {
        return this.tipstersService.updateBet(req.user.userId, id, updateData);
    }
    updateStatus(req, id, status) {
        return this.tipstersService.updateBetStatus(req.user.userId, id, status);
    }
    delete(req, id) {
        return this.tipstersService.deleteBet(req.user.userId, id);
    }
};
exports.TipstersController = TipstersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_tipster_bet_dto_1.CreateTipsterBetDto]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('seed'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipstersController.prototype, "seedFakeData", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('ranking'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)('bank'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "getBank", null);
__decorate([
    (0, common_1.Patch)('bank'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "updateBank", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TipstersController.prototype, "delete", null);
exports.TipstersController = TipstersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tipsters'),
    __metadata("design:paramtypes", [tipsters_service_1.TipstersService])
], TipstersController);
//# sourceMappingURL=tipsters.controller.js.map