import { Country } from './country.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCountryDto from './dto/createCountry.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(Country)
        private countryRepo: Repository<Country>
    ){}

    async createCountry (country: CreateCountryDto) {
        const newCountry = await this.countryRepo
        .createQueryBuilder()
        .insert()
        .into(Country)
        .values(country)
        .execute()
        return newCountry
    }

    async getAllCountry(): Promise<Country[]> {
        const country = await this.countryRepo
        .createQueryBuilder()
        .select(["country.name"])       
        .from(Country, "country")    
        .getMany();
        return country;
}
    async getCountryById(id:number) {
        const country = await this.countryRepo
        .createQueryBuilder()
        .select(["country.name"])
        .from(Country, "country")
        .where(`country.id = ${id}`)
        .getOne();
        return country;
    }
}
