import { CountryService } from './country.service';
import { Controller, Get, HttpStatus, HttpCode, Param, Post, Body } from '@nestjs/common';
import { Country } from './country.entity';
import CreateCountryDto from './dto/createCountry.dto';

@Controller('country')
export class CountryController {
    constructor (private readonly countryService: CountryService){}

    @Get()
    getAllCountry(): Promise<Country[]>{
        return this.countryService.getAllCountry();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getCountryById(@Param('id') id: number): Promise<Country> {
        return this.countryService.getCountryById(id)
    }

    @Post()
    async createCountry (@Body() country: CreateCountryDto){
        return this.countryService.createCountry(country)
    }
}
