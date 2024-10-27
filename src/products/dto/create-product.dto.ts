import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {

    @IsMongoId()
    @ApiProperty({ example: '671a646917e02ca637054f22' })
    idClient: Types.ObjectId;

    @IsString()
    @ApiProperty({ example: 'qwerty123' })
    serial: string;

    @IsString()
    @ApiProperty({ example: 'Asus TUF' })
    description: string;

    @IsNumber()
    @ApiProperty({ example: 3200000 })
    price: number;

    @IsNumber()
    @ApiProperty({ example: 20 }) 
    stock: number;

}