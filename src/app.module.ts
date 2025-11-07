import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './modules/todos/application/todos.module';
import { AppBootOpts } from './common/interfaces/app-boot-opts.interface';
import { CoreModule } from './core/core.module';
import { TodoInfrastructureModule } from './modules/todos/infrastructure/todo-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot()],
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
