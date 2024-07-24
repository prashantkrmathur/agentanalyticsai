import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password : string;

    @IsNotEmpty()
    @IsString()
    @IsMobilePhone('en-IN')
    mobile : string;

    @IsOptional()
    @IsString()
    profilePic ?: string
}