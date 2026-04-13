import { Controller, Get, Delete, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('dashboard-stats')
  getAdminStats() {
    return this.adminService.getSystemStats();
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Patch('users/:id/modules')
  updateUserModules(@Param('id') id: string, @Body('modules') modules: string[]) {
    return this.adminService.updateUserModules(id, modules);
  }

  @Patch('users/:id/password')
  resetPassword(@Param('id') id: string, @Body('password') password: string) {
    return this.adminService.resetUserPassword(id, password);
  }
}
