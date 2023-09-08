import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async singUpUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signInUser(
    authCredentialDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    const { userName, password } = authCredentialDto;

    const user = await this.userRepository.findOne({ where: { userName } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { userName };
      const token: string = await this.jwtService.sign(payload);

      return { token };
    }
    throw new UnauthorizedException("Please check login credentials");
  }
}
