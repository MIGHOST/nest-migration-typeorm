import { Article } from "./../article/article.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from './../country/country.entity';
import Language from "../language/language.entity";
import utl from "../utl/utl.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class User {
  @ApiProperty({example: '777', description: "unique"})
  @PrimaryGeneratedColumn()
  public id?: number;
  @ApiProperty({example: "newUser@mail.com", description: "unique"})
  @Column({ unique: true })
  public email: string;
  @ApiProperty({example:"newUser", description: "unique"})
  @Column({ unique: true})
  public firstName: string;
  @Column({unique:true, nullable: true})
  public login: string;
  @Column()
  public password: string;
  @Column()
  public age: number;
  @Column()
  public countryId: number;  
  @OneToMany(type => Article, (article) => article.user) article?: Article[]; 
  @ManyToOne(()=> Country, country => country.user)
  country: Country;
  @OneToMany (type=> utl, utl => utl.language)
  public utl!: utl[];
  @ManyToMany(type=> Language)
  @JoinTable()
  language: Language[];
  
}
export default User;

