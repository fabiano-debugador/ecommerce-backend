import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadGatewayException('Email registered in system.');
    }

    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordHashed,
    });
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`UserId ${userId} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email ${email} not found`);
    }

    return user;
  }
}
