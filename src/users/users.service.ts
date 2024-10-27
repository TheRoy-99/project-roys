import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this.userModel.create(createUserDto);
    } catch (error) {
      throw new BadRequestException('Ocurrió un error con el payload');
    }
  }

  async findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`ID ${id} no tiene un formato válido`);
    }
    const user = this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException(`Usuario con ID ${id} no fue encontrado`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: String) {
    return this.userModel.findByIdAndDelete({_id: id})
  }
}
