import { IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
export class LoginRequest {
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
