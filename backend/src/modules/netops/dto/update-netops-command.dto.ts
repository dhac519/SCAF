import { PartialType } from '@nestjs/mapped-types';
import { CreateNetOpsCommandDto } from './create-netops-command.dto';

export class UpdateNetOpsCommandDto extends PartialType(
  CreateNetOpsCommandDto,
) {}
