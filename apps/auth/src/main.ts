import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../apps/api-gateway/src/api-gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,  {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  },);
  await app.listen();
  console.log('✅ Auth Microservice is listening via Redis...');
}
bootstrap();
