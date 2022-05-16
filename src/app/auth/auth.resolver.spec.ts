import { AuthResolver } from '../../app/auth/auth.resolver';
import {AuthService} from '../../app/auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';


describe('AuthResolver',() => {

    let resolver: AuthResolver;
    let fakeAuthService: AuthService;

    let loginData: LoginDto = {
        "email": "login@example.com",
        "password": "password"
    }
    let service = {
        login: jest.fn((loginData)=>{
            return{ 
                accessToken:"fake-token",
                data:{
                    user_id:"fake-id",
                    role: "fake-role"
                }
            }
        })
    }

    beforeEach(async () => {

        const module:TestingModule = await Test.createTestingModule({
            providers: [
                AuthResolver,
                { 
                    provide: AuthService,
                    useValue:service
                },   
            ],
          }).compile();

          resolver= module.get<AuthResolver>(AuthResolver);
          fakeAuthService= module.get<AuthService>(AuthService);
      });
      
    it('define resolver ',()=>{
        expect(resolver).toBeDefined();
    });

    it("define login ",()=>{
        expect(resolver.login).toBeDefined();
    })

    it('should have login',async()=>{
        expect(await resolver.login(loginData)).toEqual({
            accessToken:"fake-token",
            data:{
                    user_id:"fake-id",
                    role: "fake-role"
                }
        })
        expect(fakeAuthService)
    })
});

