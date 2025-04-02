import { NestFactory } from '@nestjs/core';
import { TicketsModule } from './tickets.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
