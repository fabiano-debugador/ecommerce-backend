import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 7435,
  image: 'https://example.com/image.jpg',
  name: 'Product Name',
  price: 100.3,
  updatedAt: new Date(),
};
