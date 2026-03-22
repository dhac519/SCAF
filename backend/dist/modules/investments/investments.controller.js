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
exports.InvestmentsController = void 0;
const common_1 = require("@nestjs/common");
const investments_service_1 = require("./investments.service");
const create_investment_dto_1 = require("./dto/create-investment.dto");
const update_investment_dto_1 = require("./dto/update-investment.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let InvestmentsController = class InvestmentsController {
    investmentsService;
    constructor(investmentsService) {
        this.investmentsService = investmentsService;
    }
    create(req, createInvestmentDto) {
        return this.investmentsService.create(req.user.userId, createInvestmentDto);
    }
    findAll(req) {
        return this.investmentsService.findAll(req.user.userId);
    }
    findOne(req, id) {
        return this.investmentsService.findOne(req.user.userId, id);
    }
    update(req, id, updateInvestmentDto) {
        return this.investmentsService.update(req.user.userId, id, updateInvestmentDto);
    }
    remove(req, id) {
        return this.investmentsService.remove(req.user.userId, id);
    }
};
exports.InvestmentsController = InvestmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva inversión' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_investment_dto_1.CreateInvestmentDto]),
    __metadata("design:returntype", void 0)
], InvestmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las inversiones' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvestmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una inversión por ID' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], InvestmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una inversión (ej. currentValue)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_investment_dto_1.UpdateInvestmentDto]),
    __metadata("design:returntype", void 0)
], InvestmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una inversión' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], InvestmentsController.prototype, "remove", null);
exports.InvestmentsController = InvestmentsController = __decorate([
    (0, swagger_1.ApiTags)('Investments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('investments'),
    __metadata("design:paramtypes", [investments_service_1.InvestmentsService])
], InvestmentsController);
//# sourceMappingURL=investments.controller.js.map