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
exports.NetopsController = void 0;
const common_1 = require("@nestjs/common");
const netops_service_1 = require("./netops.service");
const create_netops_command_dto_1 = require("./dto/create-netops-command.dto");
const update_netops_command_dto_1 = require("./dto/update-netops-command.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let NetopsController = class NetopsController {
    netopsService;
    constructor(netopsService) {
        this.netopsService = netopsService;
    }
    create(req, createNetOpsCommandDto) {
        return this.netopsService.create(req.user.userId, createNetOpsCommandDto);
    }
    findAll(req) {
        return this.netopsService.findAll(req.user.userId);
    }
    findOne(req, id) {
        return this.netopsService.findOne(id, req.user.userId);
    }
    update(req, id, updateNetOpsCommandDto) {
        return this.netopsService.update(id, req.user.userId, updateNetOpsCommandDto);
    }
    remove(req, id) {
        return this.netopsService.remove(id, req.user.userId);
    }
};
exports.NetopsController = NetopsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_netops_command_dto_1.CreateNetOpsCommandDto]),
    __metadata("design:returntype", void 0)
], NetopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NetopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NetopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_netops_command_dto_1.UpdateNetOpsCommandDto]),
    __metadata("design:returntype", void 0)
], NetopsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NetopsController.prototype, "remove", null);
exports.NetopsController = NetopsController = __decorate([
    (0, common_1.Controller)('netops'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [netops_service_1.NetopsService])
], NetopsController);
//# sourceMappingURL=netops.controller.js.map