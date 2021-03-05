import { Article } from "./../article/article.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from './../country/country.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column({ unique: true })
  public email: string;
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
  
}
export default User;

