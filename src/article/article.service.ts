import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private artRepo: Repository<Article>
    ){}

    async createArticle(article: CreateArticleDto) {
        const newArticle = await this.artRepo
        .createQueryBuilder()
        .insert()
        .into(Article)
        .values(article)
        .execute()
        return newArticle;
    }

    async getAllArticles(): Promise<Article[]> { 
        const articles = await this.artRepo       
        .createQueryBuilder("article")
        .select(["article.id", "article.title", "article.content", "user.firstName"])
        .leftJoin("article.user", "user")
        .getMany();
        return articles;
    }

}
