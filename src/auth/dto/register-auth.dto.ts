import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { LoginAuthDto } from "./login-auth.dto";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
