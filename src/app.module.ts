import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AppBootOpts } from './common/interfaces/app-boot-opts.interface';
import { CoreModule } from './core/core.module';

@Module({
  imports: [TodosModule],
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(opts: AppBootOpts): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(opts),
      ],
    };
  }
}
