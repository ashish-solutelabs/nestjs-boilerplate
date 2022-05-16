import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { UserEntity } from '../user/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { generateHash } from '../../core/utility/bcrypt';


let users:UserEntity ={
    id: "a8ae3a2e-d121-11ec-9d64-0242ac120002",
    email: 'ashish@gmail.com',
    password: '$2a$10$t2qMdKTakOdVxYLCQJ3MeOxrn5tkcHJlGAzson4xyftbog5gh47kC',
    firstname: 'ashish',
    lastname: 'patel',
    phone: '7777778888',
    role: 'admin',
    active: true,
    filter: function (arg0: (user: any) => boolean): void {
        throw new Error('Function not implemented.');
    },
    created_at: Date(),
    updated_at: Date()
}

describe("AuthService", () => {
    let service: AuthService;
    let fakeJwtService:Partial<JwtService>;
    let mockRepository:Partial< Repository<UserEntity>>;
    let fakeUserService:Partial<UserService> 

    beforeEach(async() => {

        fakeUserService ={
            findByEmail: jest.fn().mockResolvedValue(users)
        }

        fakeJwtService = {
            sign: jest.fn(),
        }

        mockRepository = {
            findOne:jest.fn().mockResolvedValue(users),
        }


        const module :TestingModule = await Test.createTestingModule({
            providers: [AuthService,
                { 
                    provide: UserService,
                    useValue:fakeUserService
                },
                { 
                    provide:JwtService,
                    useValue:fakeJwtService
                },
                { 
                    provide:getRepositoryToken(UserEntity),
                    useValue:mockRepository
                }
            ]
        }).compile()

        service = module.get<AuthService>(AuthService) 
        fakeUserService = module.get<UserService>(UserService) 
        fakeJwtService = module.get<JwtService>(JwtService)
        mockRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    })

    it('authservice is define',()=>{
        expect(service).toBeDefined()
    })

    it ('login method is defined',()=>{
        expect(service.login).toBeDefined()
    })

    it('return user if password is correct provide',async ()=>{ 
        const user = await fakeUserService.findByEmail('ashish@gmail.com')
        expect(user).toBeDefined()

        expect(service.validateUser('ashish@gmail.com',"ashish@123")).not.toEqual(users)
    })

    it('login in user', async() => {
        const user = await fakeUserService.findByEmail(users.email)
        expect(user).toBeDefined()
        const payload = await service.generatePayload(user.id, user.role);

        expect(payload).toBeDefined()
        expect(payload).toEqual({
                'https://hasura.io/jwt/claims': {
                  'x-hasura-role': user.role,
                  'x-hasura-user-id': user.id,
                  'x-hasura-allowed-roles': [user.role],
                  'x-hasura-default-role': user.role,
                },
        })


        const token = fakeJwtService.sign(payload);
        expect(fakeJwtService.sign).toBeCalledTimes(1);

        expect(await service.login({email: 'ashish@gmail.com',password: "ashish@123"}))
            .toEqual({
                accessToken: token,
                data: {
                      user_id: 'a8ae3a2e-d121-11ec-9d64-0242ac120002',
                      role: 'admin',
                },
            });
    })
})
