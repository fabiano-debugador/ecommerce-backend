import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../__mocks__/product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
  });

  it('should return error if products is empty', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrowError();
  });

  it('should return product after save', async () => {
    const product = await service.createProduct(productMock);
    expect(product).toEqual(productMock);
  });

  it('should return error after trying save product', async () => {
    jest.spyOn(categoryService, 'findCategoryById').mockRejectedValue(new Error());
    expect(service.createProduct(productMock)).rejects.toThrowError();
  });
});
