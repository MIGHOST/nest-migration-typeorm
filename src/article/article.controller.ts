import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ){}

    @Get()
    getAllArticles(): Promise<Article[]>{
        return this.articleService.getAllArticles();
    }

    @Post()
    async createArticle(@Body() article: CreateArticleDto){
        return this.articleService.createArticle(article)
    }
}
