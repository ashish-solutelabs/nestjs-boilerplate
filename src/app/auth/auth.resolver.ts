import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { AuthResponse } from './models';

@Resolver()
export class AuthResolver {
  // create(user: (user: any) => any): any {
  //     throw new Error('Method not implemented.');
  // }
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input', { type: () => LoginDto }) data: LoginDto) {
    return this.authService.login(data);
  }
}
