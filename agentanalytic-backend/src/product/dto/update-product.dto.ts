import { IsEnum, IsOptional } from 'class-validator';
import { ProductCategory } from '../../entities/Product.entity';

export class UpdateProductDto  {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    image?: string;

    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;

    @IsOptional()
    discountedPrice?: number;

    @IsOptional()
    rating?: number;

    @IsOptional()
    quantity?: number;
}
