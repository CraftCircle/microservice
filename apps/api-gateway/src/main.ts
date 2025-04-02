import { NestFactory } from '@nestjs/core';
import { AppModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4040);
  console.log(`🚀 API Gateway running at http://localhost:4040/graphql`);
}
bootstrap();