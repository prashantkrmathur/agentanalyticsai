import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ProductCategory } from "src/entities/Product.entity";

export class CreateProductDto {
    @IsNotEmpty()
    @IsEnum(ProductCategory)
    category: ProductCategory;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    image?: string;

    @IsNotEmpty()
    discountedPrice: number;

    @IsNotEmpty()
    rating: number

    @IsNotEmpty()
    quantity: number
}
