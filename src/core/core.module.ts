import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppBootOpts } from 'src/common/interfaces/app-boot-opts.interface';

@Module({})
export class CoreModule {
  static forRoot(opts: AppBootOpts): DynamicModule {
    return {
      module: CoreModule,
      imports:
        opts.driver == 'typeorm'
          ? [
              TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'taha',
                password: '1234',
                autoLoadEntities: true,
                synchronize: true,
                database: 'nestjs_hexagonal_todo_app',
              }),
            ]
          : [],
    };
  }
}
