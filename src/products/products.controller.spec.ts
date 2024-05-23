import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Products, ProductsSchema } from "./schema/products.schema";

describe("ProductsController", () => {
  let controller: ProductsController;
  let services: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: Products.name,
            schema: ProductsSchema,
          },
        ]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    services = module.get<ProductsService>(ProductsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(services).toBeDefined();
  });
});
