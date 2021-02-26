import { ArticleService } from './article.service';
import { Controller, Get } from '@nestjs/common';
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
}
