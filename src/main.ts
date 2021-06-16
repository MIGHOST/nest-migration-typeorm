import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  const config = new DocumentBuilder()
  .setTitle ("Registration")
  .setDescription("REST API Doc")
  .setVersion("1.0.1")
  .addTag("Nest Test API")
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/doc", app, document)
  await app.listen(3000);
}
bootstrap();
