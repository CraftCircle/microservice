import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { LoginRequestDTO } from "./dto/login-request.dto";
import { RegisterRequestDTO } from "./dto/register-request.dto";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_login')
  async login(@Payload() data: LoginRequestDTO) {
    return this.authService.login(data);
  }

  @MessagePattern('auth_register')
  async register(@Payload() data: RegisterRequestDTO) {
    return this.authService.register(data);
  }
}