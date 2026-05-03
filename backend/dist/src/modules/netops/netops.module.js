"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetopsModule = void 0;
const common_1 = require("@nestjs/common");
const netops_service_1 = require("./netops.service");
const netops_controller_1 = require("./netops.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let NetopsModule = class NetopsModule {
};
exports.NetopsModule = NetopsModule;
exports.NetopsModule = NetopsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [netops_controller_1.NetopsController],
        providers: [netops_service_1.NetopsService],
    })
], NetopsModule);
//# sourceMappingURL=netops.module.js.map