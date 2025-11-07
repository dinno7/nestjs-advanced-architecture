import { DynamicModule, Module, Type } from '@nestjs/common';
import { TypeormPersistenceModule } from './persistence/typeorm/typeorm-persistence.module';
import { ValidDatabaseDriver } from 'src/share/types';
import { InMemoryPersistenceModule } from './persistence/in-memory/im-memory-persistence.module';

@Module({})
export class TodoInfrastructureModule {
  static register(driver: ValidDatabaseDriver): DynamicModule {
    const persistenceModules: Record<ValidDatabaseDriver, Type> = {
      typeorm: TypeormPersistenceModule,
      'in-memory': InMemoryPersistenceModule,
    };

    const persistenceModule = persistenceModules[driver];
    return {
      module: TodoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
