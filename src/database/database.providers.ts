import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      console.log('Inicializando o DataSource...');
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'CHAMAKI',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });
      try {
        await dataSource.initialize();
        console.log('DataSource inicializado com sucesso.');
        return dataSource;  // Retorne o dataSource aqui
      } catch (error) {
        console.error('Erro ao inicializar o DataSource:', error);
        throw new Error('Falha na inicialização do DataSource');  // Lança uma exceção para tratamento posterior
      }
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: ['DATA_SOURCE'],  // Exporta o DATA_SOURCE
})
export class DatabaseModule {}
