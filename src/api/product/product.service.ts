import { Injectable, NotFoundException } from '@nestjs/common';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}

@Injectable()
export class ProductService {
  private products: IProduct[] = [];

  getAllProducts(): IProduct[] {
    return this.products;
  }

  getById(id: number): IProduct {
    const product = this.products.find(
      (product) => product.id === parseInt(id.toString()),
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  createProduct(product: IProduct) {
    this.products.push({ ...product, id: this.products.length + 1 });
    return {
      message: 'Product created successfully',
      product: product,
    };
  }

  updateProduct(id: number, product: IProduct) {
    const index = this.products.findIndex(
      (p) => p.id === parseInt(id.toString()),
    );
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return { message: 'Product updated successfully' };
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex(
      (p) => p.id === parseInt(id.toString()),
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      return { message: 'Product deleted successfully' };
    } else {
      throw new NotFoundException('Product not found');
    }
  }
}
