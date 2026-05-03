import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('heartbeat')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar la fecha de última conexión del usuario',
  })
  heartbeat(@Req() req: any) {
    return this.authService.heartbeat(
      req.user.sub || req.user.userId || req.user.id,
    );
  }

  @Post('support-ticket')
  @ApiOperation({ summary: 'Crear un ticket de soporte (Público)' })
  createSupportTicket(
    @Body('email') email: string,
    @Body('reason') reason: string,
  ) {
    return this.authService.createSupportTicket(email, reason);
  }
}
