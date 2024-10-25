import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common'; // Import Logger for logging

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if needed
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("API Projeto Integrador")
    .setDescription("A API é para cadastro e login de usuários e voluntários")
    .setVersion("1.0")
    .addTag("usuario")
    .addTag("voluntario")
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Start the application
  const port = process.env.PORT || 3000; // Use environment variable for port
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
