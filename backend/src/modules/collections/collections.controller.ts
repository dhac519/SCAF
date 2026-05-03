import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import {
  CreateCategoryDto,
  CreateSubcategoryDto,
  CreateItemDto,
} from './dto/collections.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto, @Request() req: any) {
    return this.collectionsService.createCategory(dto, req.user.userId);
  }

  @Get('categories')
  getCategories(@Request() req: any) {
    return this.collectionsService.getCategories(req.user.userId);
  }

  @Post('subcategories')
  createSubcategory(@Body() dto: CreateSubcategoryDto, @Request() req: any) {
    return this.collectionsService.createSubcategory(dto, req.user.userId);
  }

  @Post('items')
  createItem(@Body() dto: CreateItemDto, @Request() req: any) {
    return this.collectionsService.createItem(dto, req.user.userId);
  }

  @Get('items')
  getItems(@Request() req: any) {
    return this.collectionsService.getItems(req.user.userId);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string, @Request() req: any) {
    return this.collectionsService.removeItem(id, req.user.userId);
  }
}
