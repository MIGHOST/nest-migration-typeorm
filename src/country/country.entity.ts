import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    public id?:number;
    @Column({unique: true})
    public name: string;
    @Column({unique: true})
    public abbreviation: string;
    @Column()
    public capital: string;
    @OneToMany(() =>User, user=> user.country) user?: User[] // oneToMany .country.name
}