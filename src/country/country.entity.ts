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
    @OneToMany(()=>User, (user: User)=> user.country.name) // oneToMany .country.name
    public user: User; 
    // @ManyToOne(type => User, user => user.country.name) user?: User; 
}