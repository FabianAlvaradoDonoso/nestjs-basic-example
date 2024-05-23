import { IsNotEmpty, IsNumber, Length, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @Length(3, 50)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;
}
