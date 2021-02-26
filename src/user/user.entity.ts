import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
  // @OneToOne(()=> Country)
  // @JoinTable({
  //   name: "country",
  //   joinColumns: [{name: "name"}]
  // })
  // public country: Country;
  @OneToMany(type => Country, country => country.user) country?: Country; 
}
export default User;

