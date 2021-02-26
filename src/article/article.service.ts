import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private artRepo: Repository<Article>
    ){}

    getAllArticles(): Promise<Article[]>{return this.artRepo.find()}
}
