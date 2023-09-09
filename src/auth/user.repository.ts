import { EntityManager, Repository } from "typeorm";
import { User } from "./user.entity";
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private entityManager: EntityManager) {
    super(User, entityManager);
  }

  async createUser(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("userName already exist.");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
