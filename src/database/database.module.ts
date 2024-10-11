import { databaseProviders } from './database.providers';
import { Module } from "@nestjs/common";




@Module({
    providers: [...databaseProviders],
    exports: ['DATA_SOURCE',...databaseProviders],
})

export class DatabaseModule {}


