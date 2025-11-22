import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { type IProduct, ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  allProducts(): IProduct[] {
    return this.productService.getAllProducts();
  }

  @Get('/by-id/:id')
  productById(@Param('id') id: number): IProduct {
    console.log(id);
    return this.productService.getById(id);
  }

  @Post('/create')
  createProduct(@Body() newProductData: any) {
    console.log(newProductData);
    return this.productService.createProduct(newProductData);
  }

  @Put('/update/:id')
  updateProduct(@Param('id') id: number, @Body() updatedProductData: any) {
    return this.productService.updateProduct(id, updatedProductData);
  }

  @Put('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
