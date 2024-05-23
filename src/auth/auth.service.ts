import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcrypt";
import { Model } from "mongoose";
import { Users, UsersDocument } from "../../src/users/schema/users.schema";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainToHash = await hash(password, 10);

    return await this.usersModel.create({
      ...registerAuthDto,
      password: plainToHash,
    });
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const findUser = await this.usersModel.findOne({
      email,
    });

    if (!findUser)
      throw new HttpException("USER_NOT_FOUND", HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword)
      throw new HttpException("WRONG_PASSWORD", HttpStatus.UNAUTHORIZED);

    const payload = { id: findUser._id, name: findUser.name };
    const token = await this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }
}
