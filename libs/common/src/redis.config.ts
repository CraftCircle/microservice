import { Transport } from '@nestjs/microservices';

export const RedisServiceConfig = {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
};
