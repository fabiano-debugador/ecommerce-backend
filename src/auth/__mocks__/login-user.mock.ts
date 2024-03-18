import { userEntityMock } from '../../user/__mock__/user.mock';
import { LoginDto } from '../dtos/login.dto';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '123',
};
