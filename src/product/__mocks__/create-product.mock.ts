import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDTO } from "../dtos/create-product.dto";

export const createProduct: CreateProductDTO = {
  categoryId: categoryMock.id,
  image: "https://example.com/image.jpg",
  name: "Product Name",
  price: 100,
};