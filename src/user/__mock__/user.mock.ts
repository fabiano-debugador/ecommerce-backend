import { UserType } from '../enum/user-type.enum';
import { UserEntity } from '../interfaces/user.entity';

export const userEntityMock: UserEntity = {
  cpf: '1234567',
  createdAt: new Date(),
  email: 'emailmock@mail.com',
  id: 89,
  name: 'nameMock',
  password: 'largePassword',
  phone: '98987979',
  typeUser: UserType.User,
  updateAt: new Date(),
};
