import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await app.listen();
  console.log('✅ Users microservice running on Redis transport');
}
bootstrap();
