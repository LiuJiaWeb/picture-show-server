import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.use(
  //   rateLimit({
  //     windowMs: 1 * 60 * 1000, // 15 minutes
  //     max: 2, // limit each IP to 100 requests per windowMs
  //   })
  // );
  await app.listen(3000);
}
bootstrap();
