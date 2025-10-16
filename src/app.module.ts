import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/application/todos.module';
import { AppBootOpts } from './common/interfaces/app-boot-opts.interface';
import { CoreModule } from './core/core.module';
import { TodoInfrastructureModule } from './todos/infrastructure/todo-infrastructure.module';

@Module({
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
        TodosModule.withInfrastructure(
          TodoInfrastructureModule.register(opts.driver),
        ),
      ],
    };
  }
}
