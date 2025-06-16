import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class CheckUsernameRequest {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
