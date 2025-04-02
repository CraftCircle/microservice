import { ClientProxyFactory, Transport } from '@nestjs/microservices';

async function main() {
  const client = ClientProxyFactory.create({
    transport: Transport.REDIS,
    options: {
        host: 'localhost',
        port: 6379,
      },
  });

  // Test: Get user by email
  const user = await client.send({ cmd: 'get-user-by-email' }, 'test@example.com').toPromise();
  console.log('Found user:', user);

  // Test: Create user
  const newUser = await client.send({ cmd: 'create-user' }, {
    email: 'new@example.com',
    name: 'New User',
    password: 'hashed123',
    role: 'USER',
  }).toPromise();

  console.log('Created user:', newUser);
}

main().catch(console.error);
