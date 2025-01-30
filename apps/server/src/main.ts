import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const environment = configService.get('app.environment');

  // 전역 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // CORS 설정
  app.enableCors({
    origin: configService.get('CLIENT_URL'),
    credentials: true,
  });

  // API 프리픽스 설정
  app.setGlobalPrefix('api');

  // 환경별 로그 레벨 설정
  if (environment === 'production') {
    app.enableShutdownHooks();
  }

  const port = configService.get('PORT', 3001);
  await app.listen(port);
  console.log(`Application is running in ${environment} mode on: ${await app.getUrl()}`);
}
bootstrap();