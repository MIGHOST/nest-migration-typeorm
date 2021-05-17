import { CreateLanguageDto } from './dto/createLanguage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import Language from './language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(Language)
        private langRepo: Repository<Language>
    ){}

    async createLanguages(language: CreateLanguageDto) {
        const newLanguage = await this.langRepo
        .createQueryBuilder()
        .insert()
        .into(Language)
        .values(language)
        .execute()
        return newLanguage;
    }
    async getAllLanguages(): Promise<Language[]> {
        const languages = await this.langRepo
        .createQueryBuilder('language')
        .select('language.name')
        .getMany()
        return languages;
    }
}
