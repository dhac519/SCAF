import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  folderId: string;
}
