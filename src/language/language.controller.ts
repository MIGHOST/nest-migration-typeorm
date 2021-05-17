import { CreateLanguageDto } from './dto/createLanguage.dto';
import { LanguageService } from './language.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import Language from './language.entity';

@Controller('language')
export class LanguageController {
    constructor (private readonly languageService: LanguageService){}

    @Get()
    getAllLanguages(): Promise<Language[]>{
        return this.languageService.getAllLanguages();
    }

    @Post()
    async createLanguage (@Body() language: CreateLanguageDto){
        return this.languageService.createLanguages(language)
    }
}
