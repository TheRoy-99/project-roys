import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @ApiProperty({ example: '10054342' })
    identification: string;

    @IsString()
    @ApiProperty({ example: 'Andres' })
    names: string;

    @IsString()
    @ApiProperty({ example: 'Morales' })
    lastNames: string;

    @IsString()
    @ApiProperty({ example: '3008774994' })
    telephone: string;

    @IsEmail()
    @IsString()
    @ApiProperty({ example: 'andres@gmail.com' })
    email: string;

    @IsString()
    @ApiProperty({ example: '123' })
    password: string;

}
