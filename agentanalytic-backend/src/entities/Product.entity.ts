import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ProductCategory {
    Electronics = "Electronics",
    Clothing = "Clothing",
    HomeAndKitchen = "Home & Kitchen",
    BeautyAndPersonalCare = "Beauty & Personal Care",
    SportsAndOutdoors = "Sports & Outdoors",
    ToysAndGames = "Toys & Games",
    Automotive = "Automotive",
    Books = "Books",
    FoodAndBeverages = "Food & Beverages",
    HealthAndWellness = "Health & Wellness"
}

@Entity({name: "products"})
export class ProductEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'enum', enum: ProductCategory})
    category: ProductCategory;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    discountedPrice: number

    @Column()
    image: string;

    @Column()
    rating : number;

    @Column({default:1})
    quantity: number
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}