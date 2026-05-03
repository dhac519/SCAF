"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNetOpsCommandDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_netops_command_dto_1 = require("./create-netops-command.dto");
class UpdateNetOpsCommandDto extends (0, mapped_types_1.PartialType)(create_netops_command_dto_1.CreateNetOpsCommandDto) {
}
exports.UpdateNetOpsCommandDto = UpdateNetOpsCommandDto;
//# sourceMappingURL=update-netops-command.dto.js.map