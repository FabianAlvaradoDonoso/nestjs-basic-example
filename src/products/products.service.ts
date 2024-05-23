import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Products, ProductsDocument } from "./schema/products.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productCreate = await this.productsModel.create(createProductDto);
    return productCreate;
  }

  async findAll() {
    const products = await this.productsModel.find();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productsModel.findById(id);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdate = await this.productsModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    return productUpdate;
  }

  async remove(id: string) {
    const productDelete = await this.productsModel.findByIdAndDelete(id);
    return productDelete;
  }
}
