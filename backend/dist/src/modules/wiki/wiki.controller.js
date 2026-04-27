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
exports.WikiController = void 0;
const common_1 = require("@nestjs/common");
const wiki_service_1 = require("./wiki.service");
const create_folder_dto_1 = require("./dto/create-folder.dto");
const create_topic_dto_1 = require("./dto/create-topic.dto");
const create_note_dto_1 = require("./dto/create-note.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let WikiController = class WikiController {
    wikiService;
    constructor(wikiService) {
        this.wikiService = wikiService;
    }
    createFolder(req, createFolderDto) {
        return this.wikiService.createFolder(req.user.userId, createFolderDto);
    }
    findAllFolders(req) {
        return this.wikiService.findAllFolders(req.user.userId);
    }
    removeFolder(req, id) {
        return this.wikiService.removeFolder(req.user.userId, id);
    }
    createTopic(req, createTopicDto) {
        return this.wikiService.createTopic(req.user.userId, createTopicDto);
    }
    removeTopic(req, id) {
        return this.wikiService.removeTopic(req.user.userId, id);
    }
    createNote(req, createNoteDto) {
        return this.wikiService.createNote(req.user.userId, createNoteDto);
    }
    findOneNote(req, id) {
        return this.wikiService.findOneNote(req.user.userId, id);
    }
    updateNote(req, id, updateNoteDto) {
        return this.wikiService.updateNote(req.user.userId, id, updateNoteDto);
    }
    removeNote(req, id) {
        return this.wikiService.removeNote(req.user.userId, id);
    }
};
exports.WikiController = WikiController;
__decorate([
    (0, common_1.Post)('folders'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una carpeta de wiki' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_folder_dto_1.CreateFolderDto]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Get)('folders'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las carpetas con sus temas y notas' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "findAllFolders", null);
__decorate([
    (0, common_1.Delete)('folders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una carpeta' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "removeFolder", null);
__decorate([
    (0, common_1.Post)('topics'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un tema dentro de una carpeta' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_topic_dto_1.CreateTopicDto]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "createTopic", null);
__decorate([
    (0, common_1.Delete)('topics/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un tema' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "removeTopic", null);
__decorate([
    (0, common_1.Post)('notes'),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nota dentro de un tema' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "createNote", null);
__decorate([
    (0, common_1.Get)('notes/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener el contenido de una nota' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "findOneNote", null);
__decorate([
    (0, common_1.Patch)('notes/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una nota' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)('notes/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una nota' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WikiController.prototype, "removeNote", null);
exports.WikiController = WikiController = __decorate([
    (0, swagger_1.ApiTags)('Wiki'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('wiki'),
    __metadata("design:paramtypes", [wiki_service_1.WikiService])
], WikiController);
//# sourceMappingURL=wiki.controller.js.map