import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly usersService: UsersService,
  ) { }

  create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      if (!Types.ObjectId.isValid(createProductDto.idClient)) {
        throw new BadRequestException('Formato de ID de cliente no válido');
      }

      const user = this.usersService.findOne(createProductDto.idClient.toString());
      if (!user) {
        throw new BadRequestException('El cliente no existe');
      }

      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    } catch (error) {
      console.error('Error al crear el producto:', error);

      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException('Datos inválidos: ' + error.message);
      }
      throw new InternalServerErrorException('Ocurrió un error al crear el producto: ' + error.message);
    }
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  findOne(id: string): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Formato de ID no válido');
    }
    const product = this.productModel.findById(id);
    if (!product) {
      throw new BadRequestException('Producto no encontrado');
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Formato de ID no válido');
    }
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
  }

  async remove(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Formato de ID no válido');
    }
    const result = await this.productModel.findByIdAndDelete(id);
    return !!result;
  }
}