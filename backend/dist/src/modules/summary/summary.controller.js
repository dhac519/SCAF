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
exports.SummaryController = void 0;
const common_1 = require("@nestjs/common");
const summary_service_1 = require("./summary.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let SummaryController = class SummaryController {
    summaryService;
    constructor(summaryService) {
        this.summaryService = summaryService;
    }
    getGlobalSummary(req) {
        return this.summaryService.getGlobalSummary(req.user.userId);
    }
};
exports.SummaryController = SummaryController;
__decorate([
    (0, common_1.Get)('global'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener resumen global del usuario' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SummaryController.prototype, "getGlobalSummary", null);
exports.SummaryController = SummaryController = __decorate([
    (0, swagger_1.ApiTags)('Summary'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('summary'),
    __metadata("design:paramtypes", [summary_service_1.SummaryService])
], SummaryController);
//# sourceMappingURL=summary.controller.js.map