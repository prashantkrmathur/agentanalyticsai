import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ){}
  public async addproduct(createProductDto: CreateProductDto) {
    try {
      const {name, category, image, description, price, discountedPrice, rating, quantity} = createProductDto; 
      if(!name || !category || !rating || !description || !price || !discountedPrice || !quantity) {
        throw new Error('Please fill all the fields')
      }
      const product = this.productRepository.create(createProductDto);
      const addedProduct = await this.productRepository.save(product);
      return {statusCode : 201, product : addedProduct}
    } catch (error) {
      console.log("error while adding a new product", error);
      return {statusCode : 400, message : error.message}
    }
  }

  public async findAllProduct() {
    try {
      const products = await this.productRepository.find();
      return {statusCode : 200, products}
    } catch (error) {
      console.log("error while fetching all products", error);
      return {statusCode : 400, message : error.message}
    }
  }

  public async getProductById(id: string) {
    try {
      const product =  await this.productRepository.findOne({
        where : {id : id}
      })
      return {statusCode : 200, product}
    } catch (error) {
      console.log("error while fetching product by id", error);
      return {statusCode : 400, message : error.message}
    }
  }

  public async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      // check id first for updating a product

      const product = await this.productRepository.findOne({
        where : {id : id}
      })
      if(!product) {
        throw new Error('Product not found')
      }
      const updatedProductData = {
        ...product,
        ...updateProductDto
      };
      console.log('====================================');
      console.log("dto", updateProductDto);
      console.log('====================================');
      const updatedProduct = await this.productRepository.save(updatedProductData)
      console.log('====================================');
      console.log("updatedProduct",updatedProduct);
      console.log('====================================');
      return {statusCode : 200, product : updateProductDto}
    } catch (error) {
      console.log("error while updating a product", error);
      return {statusCode : 400, message : error.message}
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
