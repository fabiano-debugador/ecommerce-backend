import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/adress.entity';
import { userEntityMock } from '../../user/__mock__/user.mock';

export const addressMock: AddressEntity = {
  cep: '8787876',
  cityId: cityMock.id,
  complement: 'iohioh',
  createdAt: new Date(),
  id: 67567,
  numberAddress: 654,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
