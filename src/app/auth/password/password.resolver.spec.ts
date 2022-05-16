import {PasswordResolver} from "./password.resolver"
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from "./password.service";
import { IChangePasswordResponse } from "./interface";
import { JwtAuthGuard, User } from '../../../core/utility';
import { ChangePasswordDto } from "./dto/change-password.dto";


describe("passswordResolver", () => {
    let resolver: PasswordResolver
    let fakePasswordService: Partial<PasswordService>
    let changePasswordDto:ChangePasswordDto
    
    changePasswordDto={
        oldPassword:'ashish@123',
        newPassword:'ashish@119'
    }

    beforeEach(async() => {

        fakePasswordService = {
            changePassword:  jest.fn().mockResolvedValue({
                success: true,
              } as IChangePasswordResponse),
        }

        const module:TestingModule = await Test.createTestingModule({
            providers:[
                PasswordResolver,
                {
                    provide: PasswordService,
                    useValue:fakePasswordService
                }
            ]
        }).compile()

        resolver = module.get<PasswordResolver>(PasswordResolver)
    })

    it('PasswordResolver should be defined', async () => {
        expect(resolver).toBeDefined()
    });
     
    it('JwtAuthGuard is appling in passwordresolver changepassword',async()=>{
        const guards = Reflect.getMetadata('__guards__', resolver.changePassword);
        const guard = new guards[0]();
    
        expect(guard).toBeInstanceOf(JwtAuthGuard);
    })

    it('test changepassword method is called',async()=>{

        expect(resolver.changePassword).toBeDefined();

        const result = await resolver.changePassword(changePasswordDto,{} as any)
        expect(result).toBeDefined()
        expect(result).toEqual({success:true})
        expect(fakePasswordService.changePassword).toBeCalled()
    })
})