import { Post, Controller, Body } from "@nestjs/common";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signUp")
  signUpUser(@Body() authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.authService.singUpUser(authCredentialDto);
  }
  @Post("signIn")
  signInUser(
    @Body() authCredentialDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    return this.authService.signInUser(authCredentialDto);
  }
}
