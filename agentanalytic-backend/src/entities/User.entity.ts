import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "users"})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column({unique : true})
    email : string;

    @Column()
    password : string;

    @Column()
    mobile : string

    @Column()
    profilePic : string

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

}